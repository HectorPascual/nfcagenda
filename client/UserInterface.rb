require 'gtk3'
require 'nfc'
require 'facets/timer'
require './Client'

#Definition of global constants
$blue = Gdk::RGBA::new(0,0,1,1)
$dark_blue= Gdk::RGBA::new(0,0,1,0.6)
$cian= Gdk::RGBA::new(0,0,1,0.4)
$red = Gdk::RGBA::new(1,0,0,1)
$green = Gdk::RGBA::new(0,1,0,1)
$white = Gdk::RGBA::new(1,1,1,1)

class UserInterface < Gtk::Application

	def initialize

		super("org.gtk.exampleapp",:flags_none)

		signal_connect "activate" do |application|

			#We create the main window
			@window=createWindow(application)
			#And the generic grids
			@identi_screen=create_identi_screen()
			@principal_screen=create_principal_screen()

			#We initialize the NFC reader
			@mutex = Mutex.new
			@cv = ConditionVariable.new
			start_reading

			#We create the timer but we don't start it
			@timer=define_countdown

			#We define the basic signals that we will have
			define_logout_button_signal
			define_entry_escribir_signal
			define_win_signal

			#Finally we add the identification screen and show the content
			@window.add(@identi_screen)
			@window.show_all
		end
	end


	def createWindow(application)
		@window = Gtk::ApplicationWindow.new(application)

		@window.set_title("Course Manager")
		@window.set_border_width(10)
		@window.set_default_size(500,500)
	end


	def create_identi_screen
		grid_identi = Gtk::Grid.new

		#label identification
		label_initial = Gtk::Label.new("Please login with your identification card")
		label_initial.override_color(:normal, $blue)
		label_initial.set_padding(100,250)

		grid_identi.attach(label_initial,0,1,1,1)

		return grid_identi
	end

	def create_principal_screen
		grid = Gtk::Grid.new

		label_welcome = Gtk::Label.new("Welcome  ")
		label_welcome.set_alignment(0,0)
		grid.attach(label_welcome,0,0,1,1)


		label_nombre = Gtk::Label.new("")
		label_nombre.override_color(:normal, $blue)
		label_nombre.set_hexpand(true)
		label_nombre.set_alignment(0,0)
		grid.attach(label_nombre,1,0,1,1)


		button_logout = Gtk::Button.new(:label => "Logout")
		grid.attach(button_logout,2,0,1,1)


		label_buit=Gtk::Label.new("")
		label_buit.set_padding(0,30)
		grid.attach(label_buit,0,1,1,1)


		entry_escribir = Gtk::Entry.new()
		entry_escribir.set_hexpand(true)
		grid.attach(entry_escribir,0,2,3,1)


		label_titulo = Gtk::Label.new("")
		label_titulo.override_color(:normal, $red)
		label_titulo.set_hexpand(true)
		label_titulo.set_padding(0,30)
		grid.attach(label_titulo,0,3,3,1)

		return grid
	end

	def start_reading
		thr = Thread.new(function=method(:update_principal_screen)) do
		  loop do
		    uid = readUID
		    @mutex.synchronize {
					username = send_uid(uid.to_s)
					function.call(username)
		      @cv.wait(@mutex)
		    }
		  end
		end
	end

	def define_logout_button_signal
		@principal_screen.get_child_at(2,0).signal_connect "clicked" do |_widget|
			@timer.stop

			getter = Getter.new
			getter.send_query("/logout")

			update_identi_screen
		end

	end

	def define_win_signal
		@window.signal_connect "destroy" do |_widget|
			getter=Getter.new
			getter.send_query("/logout")
		end
	end

	def define_entry_escribir_signal

		entry_escribir=@principal_screen.get_child_at(0,2)
		label_titulo=@principal_screen.get_child_at(0,3)

		entry_escribir.signal_connect "activate" do |_widget|

			@timer.reset
			@timer.start

			input=entry_escribir.text

			th = Thread.new(function=method(:update_table)){
				data=get_data(input)
				table=create_table(data)
				function.call(table,input,data,label_titulo)
			}

		end
	end

	def update_identi_screen
		@window.remove(@principal_screen)
		@window.add(@identi_screen)
		@window.show_all
		if(@principal_screen.get_child_at(0,4)!=nil)
			@principal_screen.remove(@principal_screen.get_child_at(0,4))
		end

		@cv.signal
	end

	def update_table(table,input,data,label_titulo)
		if input.include? "marks"
				label_titulo.set_text("MARKS")
			elsif input.include? "timetables"
				label_titulo.set_text("TIMETABLES")
			elsif input.include? "tasks"
				label_titulo.set_text("TASKS")
		end
		
		@principal_screen.attach(table,0,4,4,1)
		@window.show_all
	end

	def set_principal_username(username)
		@principal_screen.get_child_at(1,0).set_text("#{username}")
	end

	def update_principal_screen(username)

		@timer.reset
		@timer.start

		@window.remove(@identi_screen)

		set_principal_username(username)

		@principal_screen.get_child_at(0,2).text=""
		@principal_screen.get_child_at(0,3).text=""

		@window.add(@principal_screen)
		@window.show_all

	end

	def get_data(input)
		#Send Get
		numFilas=5
		numCol=4

		getter = Getter.new
		response = getter.send_query("/#{input}")

		return JsonMatrix.new(JSON.parse(response.body)).createMatrix

	end

	def create_table(data)
		if(@principal_screen.get_child_at(0,4)!=nil)
			@principal_screen.remove(@principal_screen.get_child_at(0,4))
		end
		table= Gtk::Table.new(500,500,false)
		for i in 0..data.length-1
			for j in 0..data[i].length-1
				cell=Gtk::Label.new(data[i][j])
				table.attach(cell,j,j+1,i,i+1)
				if i==0
					cell.override_color(:normal, $green)
					cell.override_background_color(:normal, $blue)
				elsif i%2==1
					cell.override_background_color(:normal, $cian)
				elsif (i>0 && i%2==0)
					cell.override_background_color(:normal, $dark_blue)
				end
			end
		end

		return table
	end

	def define_countdown
		t = Timer.new(60){
			puts "logout"

			update_identi_screen

			getter = Getter.new
			getter.send_query("/logout")

		}
		return t
	end

	def send_uid(uid)
		response=Connection.new("/auth?#{uid}")
		username = response.get_username
		return username
	end

	def readUID
	  ctx=NFC::Context.new
	  dev=ctx.open nil
	  dev.select
	end
end

app=UserInterface.new
app.run([$0]+ARGV)
