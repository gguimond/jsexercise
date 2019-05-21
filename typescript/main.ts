interface User {
  name: string,
  age?: number,
  toString: () => string
}

interface Album {
  name: string,
  producer: User,
  toString: () => string
}

class Artist implements User {
  public name: string;
  public album: Album;

  constructor(name: string, album: Album){
    this.name = name;
    this.album = album;
  }

  toString() {
      return `My name is ${this.name} and my album is ${this.album}`;
  }
}

class Producer implements User {
  public name: string;

  constructor(name: string){
    this.name = name;
  }

  toString() {
      return `DJ ${this.name}`;
  }
}

class LP implements Album {
  public name: string;
  public producer: User;

  constructor(name: string, producer: User){
    this.name = name;
    this.producer = producer;
  }

  toString() {
      return `LP : ${this.name}, produced by ${this.producer}`;
  }
}

class GenericUser<T extends User> {
  log: (arg: T) => void;
  logwhatever: <U>(arg: U) => void;
}

const prod = new Producer('the mechanics')
const art = new Artist('nipsey', new LP('Victory Lap', prod))
console.log(art.toString());

const GenArt = new GenericUser<Artist>()
GenArt.log = (arg) => console.log(arg)
GenArt.logwhatever = (arg) => console.log(arg)
GenArt.log(art)
//illegal
//GenArt.log(prod)
GenArt.logwhatever<Producer>(prod)
const logwhatever: <U>(arg: U) => void = (arg) => {
  console.log(arg)
}
logwhatever<Producer>(prod)