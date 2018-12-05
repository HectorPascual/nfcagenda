require 'httparty'
require 'json'

#Guardem en una variable global el tipus de taula que mostrarem per pantalla
#Sent 0->tasks,  1->timetable,   2->marks
$jsontype # 0 tasks 1 timetable 2 marks

#Mitjançant aquesta clase es realitza la conexió amb el servidor
class Connection
  include HTTParty
  #base_uri la direcció url basica sense cap query
  base_uri 'http://pbe-project.herokuapp.com/'

  #Constructor de la clase que envia un get amb les dades del uid
  def initialize(data)
    @response=self.class.get(data)
  end

  def get_username
    json=JSON.parse(@response.body)
    return json[0]['name']
  end
end

#La clase getter permet enviar el querys i els analitza
class Getter
  include HTTParty
  base_uri 'http://pbe-project.herokuapp.com/'

  #Funció que encapsula el getter i el analitzador del query
  def send_query(query)
    analizequery(query)
    self.class.get(query)
  end

  #Per mitjà d'aquesta funció s'analitza el string que escriu l'usuari
  #el qual correspon al query que enviem al servidor, així es sap quins seran
  #els "tags" de la taula d'informació del Json
  def analizequery(query)
    #Al query el primer que s'escriu es el tipus i després un ? per això fem
    #un split del string i comprovem que coincideix amb el que volem
    arrayquery = query.split('?')
    if arrayquery[0].eql? '/tasks' || query=='/tasks'
      $jsontype = 0
    elsif arrayquery[0].eql? '/timetables' || query=='/timetables'
      $jsontype = 1
    elsif arrayquery[0].eql? '/marks' || query=='/marks'
      $jsontype = 2
    else
	puts ""
    end
  end
end

class JsonMatrix
  @matrixType
  @matrixColumn
  @matrixRow
  @jsonObject
  @@jsonMatrix
  @firstRow

  #S'inicialitzen les variables de la clase
  def initialize(json)
    @jsonObject = json
    @matrixType = $jsontype
    @matrixRow = @jsonObject.length()+1
    if $jsontype == 0
      @matrixColumn = 3
      #Es crea un vector amb els tags de la taula
      @firstRow = ['date', 'subject', 'name']
    elsif $jsontype == 2
      @matrixColumn = 3
      @firstRow = ['subject', 'name', 'mark']
    elsif $jsontype == 1
      @matrixColumn = 4
      @firstRow = ['day', 'hour', 'subject', 'room']
    end
  end

  #Es crea la matriu que conte totes les dades del Json
  def createMatrix
    jsonArray = Array.new(@matrixRow)
    #Tenim un array vertical de n files, en cada casella es crea un altre
    #vector horitzontal amb tantes posicions com "tags" té aquest tipus de taula
		for i in 0..@matrixRow-1
			jsonArrayColumns = Array.new(@matrixColumn)
			for j in 0..@matrixColumn-1
        if i==0 #Quan es la primera fila s'afegeixen els tags a la matriu
          jsonArrayColumns[j] = @firstRow[j]
        else
				  jsonArrayColumns[j] = @jsonObject[i-1][@firstRow[j]].to_s
        end
			end
			jsonArray[i] = jsonArrayColumns
		end
    return jsonArray
  end

end