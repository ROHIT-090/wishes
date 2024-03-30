import React from 'react';
import PaperComponent from '../src/paper/PaperComponent';
import TextComponent from './TextComponent';


function App() {
  return (

      <><PaperComponent className="paper heart">

    </PaperComponent><PaperComponent className="paper">
        <TextComponent className="p1" text="With care," />
        <TextComponent className="p2" text="Rohit 😅 " />

      </PaperComponent><PaperComponent className="paper red">
        <TextComponent className="p1" text="Wishing u a" />
        <TextComponent className="p2" text="happy Easter..😊✨" />
      </PaperComponent><PaperComponent className="paper">
        <TextComponent className="p1" text="Hello ❤️," />
        <TextComponent className="p1" text="Miss CouchPotato" />

      </PaperComponent><PaperComponent className="paper">

        <TextComponent className="p1" text="Would u mind helping me move this paper?" />
        <TextComponent className="p1" text="its too hard for me btw🥵" />
      </PaperComponent></>
    
  );
}

export default App;
