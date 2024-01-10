// Commands object
const aliases = JSON.parse(localStorage.getItem('aliases')) || {};

const commands = {
  help: `
    help - Show this menu
    date - Print current date
    time - Print current time
  `,

  delete: (args) => {
    const alias = args[0];

    if (!aliases[alias]) {
      return `No alias found for ${alias}`; 
    }

    delete aliases[alias];

    return `Deleted alias ${alias}`;
  },

  date: () => {
    return new Date().toLocaleDateString();
  },

  time: () => {
    return new Date().toLocaleTimeString();
  },

  searchContent: (args) => {
    // Get search query from arguments
    const query = args.join(" ");

    // Search Google
    window.open(`https://www.google.com/search?q=${query}`);

    return "Searching Google for: " + query;
  },
  feelLucky: (args)=>{
    const query = args.join(" ");
    window.open("https://www.google.com/search?q=" + encodeURIComponent(query) + "&btnI=I%27m+Feeling+Lucky&nord=1");

    return "\nSearching Google for: " + query;
  },
  alias:(args) => {
    const [name, url] = args;
  
    aliases[name] = url;
  
    return `Created alias ${name} for ${url}`;
  },
  open:(args) => {
    const alias = args[0];
  
    if (!aliases[alias]) {
      return `No alias found for ${alias}`;
    }
  
    window.open("https://www."+aliases[alias]);
    return `Opening ${alias}`;
  }
};

const saveAliases = () => {
  localStorage.setItem('aliases', JSON.stringify(aliases));
}

// Handle user input  
$('#cmd').on('keydown', e => {
  if (e.keyCode == 13) {

    let input = e.target.value;

    // Print input on own line
    $('#output').append(`$ ${input}\n`);

    // Parse input
    let [cmd, ...args] = input.split(' ');

    // Execute command
    if (cmd in commands) {

      let output = commands[cmd](args);
      if (cmd === 'alias' || cmd === 'delete') {
        saveAliases(); 
      }

     
      
      
      // Print newline before output
      $('#output').append('<br/>');

      $('#output').append(output);
    }
    
    // Print newline after output
    $('#output').append('\n'); 
    $('#output').append("<br/><br/>");

    // Clear input
    e.target.value = '';
    window.onbeforeunload = saveAliases;
  }
});
