require 'nfc'

class Rfid

    def readUID
      ctx=NFC::Context.new
      dev=ctx.open nil
      dev.select
    end

    def start_reading(handler)
    @thread=Thread.start{
      uid = readUID
      handler.call(uid)
      Thread.exit
    }
    end
end
