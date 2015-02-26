import Graphics.Element (..)
import Text (plainText)
import String (append)

ship : Int -> Int

ship n = 2
forum = 2
military = 2
senate = 2
trajan = 2
build = 2 



main : Element
main =
    flow down
          [ plainText <| append "Ship Has " (toString ship)
          ,plainText <| append "Forum Has " (toString forum)
          ,plainText <| append "Military Has " (toString military)
          ,plainText <| append "Senate Has " (toString senate)
          ,plainText <| append "Trajan Has " (toString trajan)
          ,plainText <| append "Build Has " (toString build)
          ]