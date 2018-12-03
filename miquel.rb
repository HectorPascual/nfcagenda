require 'httparty'
require 'json'
require 'matrix'

$jsontype # 0 tasks 1 timetable 2 marks

class Connection
  include HTTParty
  base_uri 'http://localhost:3000'

  def initialize(data)
    self.class.get(data)
  end
end

class Getter
  include HTTParty
  base_uri 'http://localhost:3000'

  def repo(query)
    analizequery(query)
    self.class.get(query)
  end

  def analizequery(query)
    arrayquery = query.split('?')
    if arrayquery[0].eql? '/tasks'
      $jsontype = 0
    elsif arrayquery[0].eql? '/timetables'
      $jsontype = 1
    elsif arrayquery[0].eql? '/marks'
      $jsontype = 2
    else
      puts 'Please insert a valid query'
    end
  end
end

class JsonMatrix
  @@matrixType
  @@matrixColumn
  @@matrixRow
  @@jsonObject
  @@jsonMatrix
  @@firstRow

  def initialize(json)
    @@jsonObject = json
    @@matrixType = $jsontype
    @@matrixRow = @@jsonObject.length
    if $jsontype == 0
      @@matrixColumn = 3
      @@firstRow = ['Data', 'Subject', 'Name']
    elsif $jsontype == 3
      @@matrixColumn = 3
      @@firstRow = ['Subject', 'Name', 'Mark']
    elsif $jsontype == 2
      @@matrixColumn = 4
      @@firstRow = ['Day', 'Hour', 'Subject', 'Room']
    end
  end

  def createMatrix
    # la fila de arriba

    row = 0
    column = 0

    @@jsonArray = Array.new(@@matrixRow)
		for i in 0..@@matrixRow
			@@jsonArrayColumns = Array.new(@@matrixColumn)
			for j in 0..@@matrixColumn
				@@jsonArrayColumns[j]=@@jsonObject[i]['name']
			end

			@@jsonArray[i] << @@jsonArrayColumns
		end
    return @@jasonArray
  end
end

# server = Connection.new("/auth?ABC123")
getter = Getter.new
repositorio = getter.repo('/tasks?subject=PBE')
json = JSON.parse(repositorio.body)
pp json
jsonMatrix = JsonMatrix.new(json)
m1 = jsonMatrix.createMatrix

for i in 0..@@matrixRow
  for j in 0..@@matrixColumn
    puts m1[i][j]
   end
end

# repositorio= server.repo
# json=JSON.parse(repositorio.body)
