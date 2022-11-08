import i18next from "i18next";
import { useState } from "react";
import withUser from "../service/auth/withUser";
import { GlobeIcon } from "../shared/components/GlobalIcon";
import { languages } from "../shared/constant/config";

const Setting = ({ user }) => {
  const [expandLanguages, setExpandLanguages] = useState(false);
  return (
    <div className="flex max-w-[1240px] w-full mx-auto pt-4 font-bold px-4 mb-2">
      <div className="bg-white my-12 pb-6 w-full justify-center items-center overflow-hidden md:max-w-md rounded-lg shadow-sm mx-auto h-[200px]">
        <div className="flex justify-end mt-4 mr-4">
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-application-color px-2 py-1.5 text-sm font-medium shadow-sm text-white"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => setExpandLanguages((prev) => !prev)}
            >
              <GlobeIcon color="white" />
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div
              className={
                expandLanguages
                  ? "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-application-color shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-white"
                  : "hidden absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-application-color shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-white"
              }
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-1" role="none">
                {languages.map(({ code, name, country_code }) => (
                  <div key={country_code} className="px-2 py-2 text-sm w-full">
                    <button
                      className="flex ml-5 w-full"
                      onClick={() => {
                        setExpandLanguages((prev) => !prev);
                        i18next.changeLanguage(code);
                      }}
                    >
                      <img
                        src={`images/${code}.png`}
                        style={{ width: 30 }}
                        alt=""
                      />
                      <p className="ml-4">{name}</p>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withUser(Setting);
/////-----------------------------------------------------------------------------------

// import { useEffect, useState } from "react";
// import { AiFillDelete } from "react-icons/ai";
// import withUser from "../service/auth/withUser";

// const data = [
//   {
//     author: "Chinua Achebe",
//     country: "Nigeria",
//     imageLink: "images/things-fall-apart.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
//     pages: 209,
//     title: "Things Fall Apart",
//     year: 1958,
//   },
//   {
//     author: "Hans Christian Andersen",
//     country: "Denmark",
//     imageLink: "images/fairy-tales.jpg",
//     language: "Danish",
//     link: "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
//     pages: 784,
//     title: "Fairy tales",
//     year: 1836,
//   },
//   {
//     author: "Dante Alighieri",
//     country: "Italy",
//     imageLink: "images/the-divine-comedy.jpg",
//     language: "Italian",
//     link: "https://en.wikipedia.org/wiki/Divine_Comedy\n",
//     pages: 928,
//     title: "The Divine Comedy",
//     year: 1315,
//   },
//   {
//     author: "Unknown",
//     country: "Sumer and Akkadian Empire",
//     imageLink: "images/the-epic-of-gilgamesh.jpg",
//     language: "Akkadian",
//     link: "https://en.wikipedia.org/wiki/Epic_of_Gilgamesh\n",
//     pages: 160,
//     title: "The Epic Of Gilgamesh",
//     year: -1700,
//   },
//   {
//     author: "Unknown",
//     country: "Achaemenid Empire",
//     imageLink: "images/the-book-of-job.jpg",
//     language: "Hebrew",
//     link: "https://en.wikipedia.org/wiki/Book_of_Job\n",
//     pages: 176,
//     title: "The Book Of Job",
//     year: -600,
//   },
//   {
//     author: "Unknown",
//     country: "India/Iran/Iraq/Egypt/Tajikistan",
//     imageLink: "images/one-thousand-and-one-nights.jpg",
//     language: "Arabic",
//     link: "https://en.wikipedia.org/wiki/One_Thousand_and_One_Nights\n",
//     pages: 288,
//     title: "One Thousand and One Nights",
//     year: 1200,
//   },
//   {
//     author: "Unknown",
//     country: "Iceland",
//     imageLink: "images/njals-saga.jpg",
//     language: "Old Norse",
//     link: "https://en.wikipedia.org/wiki/Nj%C3%A1ls_saga\n",
//     pages: 384,
//     title: "Nj\u00e1l's Saga",
//     year: 1350,
//   },
//   {
//     author: "Jane Austen",
//     country: "United Kingdom",
//     imageLink: "images/pride-and-prejudice.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/Pride_and_Prejudice\n",
//     pages: 226,
//     title: "Pride and Prejudice",
//     year: 1813,
//   },
//   {
//     author: "Honor\u00e9 de Balzac",
//     country: "France",
//     imageLink: "images/le-pere-goriot.jpg",
//     language: "French",
//     link: "https://en.wikipedia.org/wiki/Le_P%C3%A8re_Goriot\n",
//     pages: 443,
//     title: "Le P\u00e8re Goriot",
//     year: 1835,
//   },
//   {
//     author: "Samuel Beckett",
//     country: "Republic of Ireland",
//     imageLink: "images/molloy-malone-dies-the-unnamable.jpg",
//     language: "French, English",
//     link: "https://en.wikipedia.org/wiki/Molloy_(novel)\n",
//     pages: 256,
//     title: "Molloy, Malone Dies, The Unnamable, the trilogy",
//     year: 1952,
//   },
//   {
//     author: "Giovanni Boccaccio",
//     country: "Italy",
//     imageLink: "images/the-decameron.jpg",
//     language: "Italian",
//     link: "https://en.wikipedia.org/wiki/The_Decameron\n",
//     pages: 1024,
//     title: "The Decameron",
//     year: 1351,
//   },
//   {
//     author: "Jorge Luis Borges",
//     country: "Argentina",
//     imageLink: "images/ficciones.jpg",
//     language: "Spanish",
//     link: "https://en.wikipedia.org/wiki/Ficciones\n",
//     pages: 224,
//     title: "Ficciones",
//     year: 1965,
//   },
//   {
//     author: "Emily Bront\u00eb",
//     country: "United Kingdom",
//     imageLink: "images/wuthering-heights.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/Wuthering_Heights\n",
//     pages: 342,
//     title: "Wuthering Heights",
//     year: 1847,
//   },
//   {
//     author: "Albert Camus",
//     country: "Algeria, French Empire",
//     imageLink: "images/l-etranger.jpg",
//     language: "French",
//     link: "https://en.wikipedia.org/wiki/The_Stranger_(novel)\n",
//     pages: 185,
//     title: "The Stranger",
//     year: 1942,
//   },
//   {
//     author: "Paul Celan",
//     country: "Romania, France",
//     imageLink: "images/poems-paul-celan.jpg",
//     language: "German",
//     link: "\n",
//     pages: 320,
//     title: "Poems",
//     year: 1952,
//   },
//   {
//     author: "Louis-Ferdinand C\u00e9line",
//     country: "France",
//     imageLink: "images/voyage-au-bout-de-la-nuit.jpg",
//     language: "French",
//     link: "https://en.wikipedia.org/wiki/Journey_to_the_End_of_the_Night\n",
//     pages: 505,
//     title: "Journey to the End of the Night",
//     year: 1932,
//   },
//   {
//     author: "Miguel de Cervantes",
//     country: "Spain",
//     imageLink: "images/don-quijote-de-la-mancha.jpg",
//     language: "Spanish",
//     link: "https://en.wikipedia.org/wiki/Don_Quixote\n",
//     pages: 1056,
//     title: "Don Quijote De La Mancha",
//     year: 1610,
//   },
//   {
//     author: "Geoffrey Chaucer",
//     country: "England",
//     imageLink: "images/the-canterbury-tales.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/The_Canterbury_Tales\n",
//     pages: 544,
//     title: "The Canterbury Tales",
//     year: 1450,
//   },
//   {
//     author: "Anton Chekhov",
//     country: "Russia",
//     imageLink: "images/stories-of-anton-chekhov.jpg",
//     language: "Russian",
//     link: "https://en.wikipedia.org/wiki/List_of_short_stories_by_Anton_Chekhov\n",
//     pages: 194,
//     title: "Stories",
//     year: 1886,
//   },
//   {
//     author: "Joseph Conrad",
//     country: "United Kingdom",
//     imageLink: "images/nostromo.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/Nostromo\n",
//     pages: 320,
//     title: "Nostromo",
//     year: 1904,
//   },
//   {
//     author: "Charles Dickens",
//     country: "United Kingdom",
//     imageLink: "images/great-expectations.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/Great_Expectations\n",
//     pages: 194,
//     title: "Great Expectations",
//     year: 1861,
//   },
//   {
//     author: "Denis Diderot",
//     country: "France",
//     imageLink: "images/jacques-the-fatalist.jpg",
//     language: "French",
//     link: "https://en.wikipedia.org/wiki/Jacques_the_Fatalist\n",
//     pages: 596,
//     title: "Jacques the Fatalist",
//     year: 1796,
//   },
//   {
//     author: "Alfred D\u00f6blin",
//     country: "Germany",
//     imageLink: "images/berlin-alexanderplatz.jpg",
//     language: "German",
//     link: "https://en.wikipedia.org/wiki/Berlin_Alexanderplatz\n",
//     pages: 600,
//     title: "Berlin Alexanderplatz",
//     year: 1929,
//   },
//   {
//     author: "Fyodor Dostoevsky",
//     country: "Russia",
//     imageLink: "images/crime-and-punishment.jpg",
//     language: "Russian",
//     link: "https://en.wikipedia.org/wiki/Crime_and_Punishment\n",
//     pages: 551,
//     title: "Crime and Punishment",
//     year: 1866,
//   },
//   {
//     author: "Fyodor Dostoevsky",
//     country: "Russia",
//     imageLink: "images/the-idiot.jpg",
//     language: "Russian",
//     link: "https://en.wikipedia.org/wiki/The_Idiot\n",
//     pages: 656,
//     title: "The Idiot",
//     year: 1869,
//   },
//   {
//     author: "Fyodor Dostoevsky",
//     country: "Russia",
//     imageLink: "images/the-possessed.jpg",
//     language: "Russian",
//     link: "https://en.wikipedia.org/wiki/Demons_(Dostoyevsky_novel)\n",
//     pages: 768,
//     title: "The Possessed",
//     year: 1872,
//   },
//   {
//     author: "Fyodor Dostoevsky",
//     country: "Russia",
//     imageLink: "images/the-brothers-karamazov.jpg",
//     language: "Russian",
//     link: "https://en.wikipedia.org/wiki/The_Brothers_Karamazov\n",
//     pages: 824,
//     title: "The Brothers Karamazov",
//     year: 1880,
//   },
//   {
//     author: "George Eliot",
//     country: "United Kingdom",
//     imageLink: "images/middlemarch.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/Middlemarch\n",
//     pages: 800,
//     title: "Middlemarch",
//     year: 1871,
//   },
//   {
//     author: "Ralph Ellison",
//     country: "United States",
//     imageLink: "images/invisible-man.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/Invisible_Man\n",
//     pages: 581,
//     title: "Invisible Man",
//     year: 1952,
//   },
//   {
//     author: "Euripides",
//     country: "Greece",
//     imageLink: "images/medea.jpg",
//     language: "Greek",
//     link: "https://en.wikipedia.org/wiki/Medea_(play)\n",
//     pages: 104,
//     title: "Medea",
//     year: -431,
//   },
//   {
//     author: "William Faulkner",
//     country: "United States",
//     imageLink: "images/absalom-absalom.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/Absalom,_Absalom!\n",
//     pages: 313,
//     title: "Absalom, Absalom!",
//     year: 1936,
//   },
//   {
//     author: "William Faulkner",
//     country: "United States",
//     imageLink: "images/the-sound-and-the-fury.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/The_Sound_and_the_Fury\n",
//     pages: 326,
//     title: "The Sound and the Fury",
//     year: 1929,
//   },
//   {
//     author: "Gustave Flaubert",
//     country: "France",
//     imageLink: "images/madame-bovary.jpg",
//     language: "French",
//     link: "https://en.wikipedia.org/wiki/Madame_Bovary\n",
//     pages: 528,
//     title: "Madame Bovary",
//     year: 1857,
//   },
//   {
//     author: "Gustave Flaubert",
//     country: "France",
//     imageLink: "images/l-education-sentimentale.jpg",
//     language: "French",
//     link: "https://en.wikipedia.org/wiki/Sentimental_Education\n",
//     pages: 606,
//     title: "Sentimental Education",
//     year: 1869,
//   },
//   {
//     author: "Federico Garc\u00eda Lorca",
//     country: "Spain",
//     imageLink: "images/gypsy-ballads.jpg",
//     language: "Spanish",
//     link: "https://en.wikipedia.org/wiki/Gypsy_Ballads\n",
//     pages: 218,
//     title: "Gypsy Ballads",
//     year: 1928,
//   },
//   {
//     author: "Gabriel Garc\u00eda M\u00e1rquez",
//     country: "Colombia",
//     imageLink: "images/one-hundred-years-of-solitude.jpg",
//     language: "Spanish",
//     link: "https://en.wikipedia.org/wiki/One_Hundred_Years_of_Solitude\n",
//     pages: 417,
//     title: "One Hundred Years of Solitude",
//     year: 1967,
//   },
//   {
//     author: "Gabriel Garc\u00eda M\u00e1rquez",
//     country: "Colombia",
//     imageLink: "images/love-in-the-time-of-cholera.jpg",
//     language: "Spanish",
//     link: "https://en.wikipedia.org/wiki/Love_in_the_Time_of_Cholera\n",
//     pages: 368,
//     title: "Love in the Time of Cholera",
//     year: 1985,
//   },
//   {
//     author: "Johann Wolfgang von Goethe",
//     country: "Saxe-Weimar",
//     imageLink: "images/faust.jpg",
//     language: "German",
//     link: "https://en.wikipedia.org/wiki/Goethe%27s_Faust\n",
//     pages: 158,
//     title: "Faust",
//     year: 1832,
//   },
//   {
//     author: "Nikolai Gogol",
//     country: "Russia",
//     imageLink: "images/dead-souls.jpg",
//     language: "Russian",
//     link: "https://en.wikipedia.org/wiki/Dead_Souls\n",
//     pages: 432,
//     title: "Dead Souls",
//     year: 1842,
//   },
//   {
//     author: "G\u00fcnter Grass",
//     country: "Germany",
//     imageLink: "images/the-tin-drum.jpg",
//     language: "German",
//     link: "https://en.wikipedia.org/wiki/The_Tin_Drum\n",
//     pages: 600,
//     title: "The Tin Drum",
//     year: 1959,
//   },
//   {
//     author: "Jo\u00e3o Guimar\u00e3es Rosa",
//     country: "Brazil",
//     imageLink: "images/the-devil-to-pay-in-the-backlands.jpg",
//     language: "Portuguese",
//     link: "https://en.wikipedia.org/wiki/The_Devil_to_Pay_in_the_Backlands\n",
//     pages: 494,
//     title: "The Devil to Pay in the Backlands",
//     year: 1956,
//   },
//   {
//     author: "Knut Hamsun",
//     country: "Norway",
//     imageLink: "images/hunger.jpg",
//     language: "Norwegian",
//     link: "https://en.wikipedia.org/wiki/Hunger_(Hamsun_novel)\n",
//     pages: 176,
//     title: "Hunger",
//     year: 1890,
//   },
//   {
//     author: "Ernest Hemingway",
//     country: "United States",
//     imageLink: "images/the-old-man-and-the-sea.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/The_Old_Man_and_the_Sea\n",
//     pages: 128,
//     title: "The Old Man and the Sea",
//     year: 1952,
//   },
//   {
//     author: "Homer",
//     country: "Greece",
//     imageLink: "images/the-iliad-of-homer.jpg",
//     language: "Greek",
//     link: "https://en.wikipedia.org/wiki/Iliad\n",
//     pages: 608,
//     title: "Iliad",
//     year: -735,
//   },
//   {
//     author: "Homer",
//     country: "Greece",
//     imageLink: "images/the-odyssey-of-homer.jpg",
//     language: "Greek",
//     link: "https://en.wikipedia.org/wiki/Odyssey\n",
//     pages: 374,
//     title: "Odyssey",
//     year: -800,
//   },
//   {
//     author: "Henrik Ibsen",
//     country: "Norway",
//     imageLink: "images/a-Dolls-house.jpg",
//     language: "Norwegian",
//     link: "https://en.wikipedia.org/wiki/A_Doll%27s_House\n",
//     pages: 68,
//     title: "A Doll's House",
//     year: 1879,
//   },
//   {
//     author: "James Joyce",
//     country: "Irish Free State",
//     imageLink: "images/ulysses.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/Ulysses_(novel)\n",
//     pages: 228,
//     title: "Ulysses",
//     year: 1922,
//   },
//   {
//     author: "Franz Kafka",
//     country: "Czechoslovakia",
//     imageLink: "images/stories-of-franz-kafka.jpg",
//     language: "German",
//     link: "https://en.wikipedia.org/wiki/Franz_Kafka_bibliography#Short_stories\n",
//     pages: 488,
//     title: "Stories",
//     year: 1924,
//   },
//   {
//     author: "Franz Kafka",
//     country: "Czechoslovakia",
//     imageLink: "images/the-trial.jpg",
//     language: "German",
//     link: "https://en.wikipedia.org/wiki/The_Trial\n",
//     pages: 160,
//     title: "The Trial",
//     year: 1925,
//   },
//   {
//     author: "Franz Kafka",
//     country: "Czechoslovakia",
//     imageLink: "images/the-castle.jpg",
//     language: "German",
//     link: "https://en.wikipedia.org/wiki/The_Castle_(novel)\n",
//     pages: 352,
//     title: "The Castle",
//     year: 1926,
//   },
//   {
//     author: "K\u0101lid\u0101sa",
//     country: "India",
//     imageLink: "images/the-recognition-of-shakuntala.jpg",
//     language: "Sanskrit",
//     link: "https://en.wikipedia.org/wiki/Abhij%C3%B1%C4%81na%C5%9B%C4%81kuntalam\n",
//     pages: 147,
//     title: "The recognition of Shakuntala",
//     year: 150,
//   },
//   {
//     author: "Yasunari Kawabata",
//     country: "Japan",
//     imageLink: "images/the-sound-of-the-mountain.jpg",
//     language: "Japanese",
//     link: "https://en.wikipedia.org/wiki/The_Sound_of_the_Mountain\n",
//     pages: 288,
//     title: "The Sound of the Mountain",
//     year: 1954,
//   },
//   {
//     author: "Nikos Kazantzakis",
//     country: "Greece",
//     imageLink: "images/zorba-the-greek.jpg",
//     language: "Greek",
//     link: "https://en.wikipedia.org/wiki/Zorba_the_Greek\n",
//     pages: 368,
//     title: "Zorba the Greek",
//     year: 1946,
//   },
//   {
//     author: "D. H. Lawrence",
//     country: "United Kingdom",
//     imageLink: "images/sons-and-lovers.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/Sons_and_Lovers\n",
//     pages: 432,
//     title: "Sons and Lovers",
//     year: 1913,
//   },
//   {
//     author: "Halld\u00f3r Laxness",
//     country: "Iceland",
//     imageLink: "images/independent-people.jpg",
//     language: "Icelandic",
//     link: "https://en.wikipedia.org/wiki/Independent_People\n",
//     pages: 470,
//     title: "Independent People",
//     year: 1934,
//   },
//   {
//     author: "Giacomo Leopardi",
//     country: "Italy",
//     imageLink: "images/poems-giacomo-leopardi.jpg",
//     language: "Italian",
//     link: "\n",
//     pages: 184,
//     title: "Poems",
//     year: 1818,
//   },
//   {
//     author: "Doris Lessing",
//     country: "United Kingdom",
//     imageLink: "images/the-golden-notebook.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/The_Golden_Notebook\n",
//     pages: 688,
//     title: "The Golden Notebook",
//     year: 1962,
//   },
//   {
//     author: "Astrid Lindgren",
//     country: "Sweden",
//     imageLink: "images/pippi-longstocking.jpg",
//     language: "Swedish",
//     link: "https://en.wikipedia.org/wiki/Pippi_Longstocking\n",
//     pages: 160,
//     title: "Pippi Longstocking",
//     year: 1945,
//   },
//   {
//     author: "Lu Xun",
//     country: "China",
//     imageLink: "images/diary-of-a-madman.jpg",
//     language: "Chinese",
//     link: "https://en.wikipedia.org/wiki/A_Madman%27s_Diary\n",
//     pages: 389,
//     title: "Diary of a Madman",
//     year: 1918,
//   },
//   {
//     author: "Naguib Mahfouz",
//     country: "Egypt",
//     imageLink: "images/children-of-gebelawi.jpg",
//     language: "Arabic",
//     link: "https://en.wikipedia.org/wiki/Children_of_Gebelawi\n",
//     pages: 355,
//     title: "Children of Gebelawi",
//     year: 1959,
//   },
//   {
//     author: "Thomas Mann",
//     country: "Germany",
//     imageLink: "images/buddenbrooks.jpg",
//     language: "German",
//     link: "https://en.wikipedia.org/wiki/Buddenbrooks\n",
//     pages: 736,
//     title: "Buddenbrooks",
//     year: 1901,
//   },
//   {
//     author: "Thomas Mann",
//     country: "Germany",
//     imageLink: "images/the-magic-mountain.jpg",
//     language: "German",
//     link: "https://en.wikipedia.org/wiki/The_Magic_Mountain\n",
//     pages: 720,
//     title: "The Magic Mountain",
//     year: 1924,
//   },
//   {
//     author: "Herman Melville",
//     country: "United States",
//     imageLink: "images/moby-dick.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/Moby-Dick\n",
//     pages: 378,
//     title: "Moby Dick",
//     year: 1851,
//   },
//   {
//     author: "Michel de Montaigne",
//     country: "France",
//     imageLink: "images/essais.jpg",
//     language: "French",
//     link: "https://en.wikipedia.org/wiki/Essays_(Montaigne)\n",
//     pages: 404,
//     title: "Essays",
//     year: 1595,
//   },
//   {
//     author: "Elsa Morante",
//     country: "Italy",
//     imageLink: "images/history.jpg",
//     language: "Italian",
//     link: "https://en.wikipedia.org/wiki/History_(novel)\n",
//     pages: 600,
//     title: "History",
//     year: 1974,
//   },
//   {
//     author: "Toni Morrison",
//     country: "United States",
//     imageLink: "images/beloved.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/Beloved_(novel)\n",
//     pages: 321,
//     title: "Beloved",
//     year: 1987,
//   },
//   {
//     author: "Murasaki Shikibu",
//     country: "Japan",
//     imageLink: "images/the-tale-of-genji.jpg",
//     language: "Japanese",
//     link: "https://en.wikipedia.org/wiki/The_Tale_of_Genji\n",
//     pages: 1360,
//     title: "The Tale of Genji",
//     year: 1006,
//   },
//   {
//     author: "Robert Musil",
//     country: "Austria",
//     imageLink: "images/the-man-without-qualities.jpg",
//     language: "German",
//     link: "https://en.wikipedia.org/wiki/The_Man_Without_Qualities\n",
//     pages: 365,
//     title: "The Man Without Qualities",
//     year: 1931,
//   },
//   {
//     author: "Vladimir Nabokov",
//     country: "Russia/United States",
//     imageLink: "images/lolita.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/Lolita\n",
//     pages: 317,
//     title: "Lolita",
//     year: 1955,
//   },
//   {
//     author: "George Orwell",
//     country: "United Kingdom",
//     imageLink: "images/nineteen-eighty-four.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/Nineteen_Eighty-Four\n",
//     pages: 272,
//     title: "Nineteen Eighty-Four",
//     year: 1949,
//   },
//   {
//     author: "Ovid",
//     country: "Roman Empire",
//     imageLink: "images/the-metamorphoses-of-ovid.jpg",
//     language: "Classical Latin",
//     link: "https://en.wikipedia.org/wiki/Metamorphoses\n",
//     pages: 576,
//     title: "Metamorphoses",
//     year: 100,
//   },
//   {
//     author: "Fernando Pessoa",
//     country: "Portugal",
//     imageLink: "images/the-book-of-disquiet.jpg",
//     language: "Portuguese",
//     link: "https://en.wikipedia.org/wiki/The_Book_of_Disquiet\n",
//     pages: 272,
//     title: "The Book of Disquiet",
//     year: 1928,
//   },
//   {
//     author: "Edgar Allan Poe",
//     country: "United States",
//     imageLink: "images/tales-and-poems-of-edgar-allan-poe.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/Edgar_Allan_Poe_bibliography#Tales\n",
//     pages: 842,
//     title: "Tales",
//     year: 1950,
//   },
//   {
//     author: "Marcel Proust",
//     country: "France",
//     imageLink: "images/a-la-recherche-du-temps-perdu.jpg",
//     language: "French",
//     link: "https://en.wikipedia.org/wiki/In_Search_of_Lost_Time\n",
//     pages: 2408,
//     title: "In Search of Lost Time",
//     year: 1920,
//   },
//   {
//     author: "Fran\u00e7ois Rabelais",
//     country: "France",
//     imageLink: "images/gargantua-and-pantagruel.jpg",
//     language: "French",
//     link: "https://en.wikipedia.org/wiki/Gargantua_and_Pantagruel\n",
//     pages: 623,
//     title: "Gargantua and Pantagruel",
//     year: 1533,
//   },
//   {
//     author: "Juan Rulfo",
//     country: "Mexico",
//     imageLink: "images/pedro-paramo.jpg",
//     language: "Spanish",
//     link: "https://en.wikipedia.org/wiki/Pedro_P%C3%A1ramo\n",
//     pages: 124,
//     title: "Pedro P\u00e1ramo",
//     year: 1955,
//   },
//   {
//     author: "Rumi",
//     country: "Sultanate of Rum",
//     imageLink: "images/the-masnavi.jpg",
//     language: "Persian",
//     link: "https://en.wikipedia.org/wiki/Masnavi\n",
//     pages: 438,
//     title: "The Masnavi",
//     year: 1236,
//   },
//   {
//     author: "Salman Rushdie",
//     country: "United Kingdom, India",
//     imageLink: "images/midnights-children.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/Midnight%27s_Children\n",
//     pages: 536,
//     title: "Midnight's Children",
//     year: 1981,
//   },
//   {
//     author: "Saadi",
//     country: "Persia, Persian Empire",
//     imageLink: "images/bostan.jpg",
//     language: "Persian",
//     link: "https://en.wikipedia.org/wiki/Bustan_(book)\n",
//     pages: 298,
//     title: "Bostan",
//     year: 1257,
//   },
//   {
//     author: "Tayeb Salih",
//     country: "Sudan",
//     imageLink: "images/season-of-migration-to-the-north.jpg",
//     language: "Arabic",
//     link: "https://en.wikipedia.org/wiki/Season_of_Migration_to_the_North\n",
//     pages: 139,
//     title: "Season of Migration to the North",
//     year: 1966,
//   },
//   {
//     author: "Jos\u00e9 Saramago",
//     country: "Portugal",
//     imageLink: "images/blindness.jpg",
//     language: "Portuguese",
//     link: "https://en.wikipedia.org/wiki/Blindness_(novel)\n",
//     pages: 352,
//     title: "Blindness",
//     year: 1995,
//   },
//   {
//     author: "William Shakespeare",
//     country: "England",
//     imageLink: "images/hamlet.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/Hamlet\n",
//     pages: 432,
//     title: "Hamlet",
//     year: 1603,
//   },
//   {
//     author: "William Shakespeare",
//     country: "England",
//     imageLink: "images/king-lear.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/King_Lear\n",
//     pages: 384,
//     title: "King Lear",
//     year: 1608,
//   },
//   {
//     author: "William Shakespeare",
//     country: "England",
//     imageLink: "images/othello.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/Othello\n",
//     pages: 314,
//     title: "Othello",
//     year: 1609,
//   },
//   {
//     author: "Sophocles",
//     country: "Greece",
//     imageLink: "images/oedipus-the-king.jpg",
//     language: "Greek",
//     link: "https://en.wikipedia.org/wiki/Oedipus_the_King\n",
//     pages: 88,
//     title: "Oedipus the King",
//     year: -430,
//   },
//   {
//     author: "Stendhal",
//     country: "France",
//     imageLink: "images/le-rouge-et-le-noir.jpg",
//     language: "French",
//     link: "https://en.wikipedia.org/wiki/The_Red_and_the_Black\n",
//     pages: 576,
//     title: "The Red and the Black",
//     year: 1830,
//   },
//   {
//     author: "Laurence Sterne",
//     country: "England",
//     imageLink: "images/the-life-and-opinions-of-tristram-shandy.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/The_Life_and_Opinions_of_Tristram_Shandy,_Gentleman\n",
//     pages: 640,
//     title: "The Life And Opinions of Tristram Shandy",
//     year: 1760,
//   },
//   {
//     author: "Italo Svevo",
//     country: "Italy",
//     imageLink: "images/confessions-of-zeno.jpg",
//     language: "Italian",
//     link: "https://en.wikipedia.org/wiki/Zeno%27s_Conscience\n",
//     pages: 412,
//     title: "Confessions of Zeno",
//     year: 1923,
//   },
//   {
//     author: "Jonathan Swift",
//     country: "Ireland",
//     imageLink: "images/gullivers-travels.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/Gulliver%27s_Travels\n",
//     pages: 178,
//     title: "Gulliver's Travels",
//     year: 1726,
//   },
//   {
//     author: "Leo Tolstoy",
//     country: "Russia",
//     imageLink: "images/war-and-peace.jpg",
//     language: "Russian",
//     link: "https://en.wikipedia.org/wiki/War_and_Peace\n",
//     pages: 1296,
//     title: "War and Peace",
//     year: 1867,
//   },
//   {
//     author: "Leo Tolstoy",
//     country: "Russia",
//     imageLink: "images/anna-karenina.jpg",
//     language: "Russian",
//     link: "https://en.wikipedia.org/wiki/Anna_Karenina\n",
//     pages: 864,
//     title: "Anna Karenina",
//     year: 1877,
//   },
//   {
//     author: "Leo Tolstoy",
//     country: "Russia",
//     imageLink: "images/the-death-of-ivan-ilyich.jpg",
//     language: "Russian",
//     link: "https://en.wikipedia.org/wiki/The_Death_of_Ivan_Ilyich\n",
//     pages: 92,
//     title: "The Death of Ivan Ilyich",
//     year: 1886,
//   },
//   {
//     author: "Mark Twain",
//     country: "United States",
//     imageLink: "images/the-adventures-of-huckleberry-finn.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/Adventures_of_Huckleberry_Finn\n",
//     pages: 224,
//     title: "The Adventures of Huckleberry Finn",
//     year: 1884,
//   },
//   {
//     author: "Valmiki",
//     country: "India",
//     imageLink: "images/ramayana.jpg",
//     language: "Sanskrit",
//     link: "https://en.wikipedia.org/wiki/Ramayana\n",
//     pages: 152,
//     title: "Ramayana",
//     year: -450,
//   },
//   {
//     author: "Virgil",
//     country: "Roman Empire",
//     imageLink: "images/the-aeneid.jpg",
//     language: "Classical Latin",
//     link: "https://en.wikipedia.org/wiki/Aeneid\n",
//     pages: 442,
//     title: "The Aeneid",
//     year: -23,
//   },
//   {
//     author: "Vyasa",
//     country: "India",
//     imageLink: "images/the-mahab-harata.jpg",
//     language: "Sanskrit",
//     link: "https://en.wikipedia.org/wiki/Mahabharata\n",
//     pages: 276,
//     title: "Mahabharata",
//     year: -700,
//   },
//   {
//     author: "Walt Whitman",
//     country: "United States",
//     imageLink: "images/leaves-of-grass.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/Leaves_of_Grass\n",
//     pages: 152,
//     title: "Leaves of Grass",
//     year: 1855,
//   },
//   {
//     author: "Virginia Woolf",
//     country: "United Kingdom",
//     imageLink: "images/mrs-dalloway.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/Mrs_Dalloway\n",
//     pages: 216,
//     title: "Mrs Dalloway",
//     year: 1925,
//   },
//   {
//     author: "Virginia Woolf",
//     country: "United Kingdom",
//     imageLink: "images/to-the-lighthouse.jpg",
//     language: "English",
//     link: "https://en.wikipedia.org/wiki/To_the_Lighthouse\n",
//     pages: 209,
//     title: "To the Lighthouse",
//     year: 1927,
//   },
//   {
//     author: "Marguerite Yourcenar",
//     country: "France/Belgium",
//     imageLink: "images/memoirs-of-hadrian.jpg",
//     language: "French",
//     link: "https://en.wikipedia.org/wiki/Memoirs_of_Hadrian\n",
//     pages: 408,
//     title: "Memoirs of Hadrian",
//     year: 1951,
//   },
// ];

// const Setting = ({ user }) => {
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchUsers, setSearchUsers] = useState("");
//   const [selectedUser, setSelectedUser] = useState([]);
//   const [loadingUserBackend, setLoadingUserBackend] = useState(false);

//   useEffect(() => {
//     if (searchUsers !== "") {
//       setLoadingUserBackend(true);
//       const delayDebounceFn = setTimeout(() => {
//         const newFilter = data.filter((value) => {
//           return value.title.toLowerCase().includes(searchUsers.toLowerCase());
//         });

//         setFilteredData(newFilter);

//         setLoadingUserBackend(false);
//       }, 1000);
//       return () => clearTimeout(delayDebounceFn);
//     } else {
//       setFilteredData([]);
//     }
//   }, [searchUsers]);

//   const handleDeleteTags = (removedIndex) => {
//     setSelectedUser([
//       ...selectedUser.filter((_, index) => index !== removedIndex),
//     ]);
//   };

//   const handleSelectUserFromSuggestion = (value) => {
//     setSelectedUser((old) => [...old, value]);
//     setFilteredData([]);
//     setSearchUsers("");
//   };

//   return (
//     <div>
//       <div>
//         <ul className="flex overflow-hidden overflow-x-auto p-0 ml-2 text-xs">
//           {selectedUser.map((value, index) => (
//             <li
//               key={index}
//               className="flex flex-shrink-0 w-auto h-[32px] items-center justify-center text-white rounded-md mt-2 mx-1 bg-application-color"
//             >
//               <div className="px-2">{value.title}</div>
//               <div
//                 className="flex h-[32px] hover:cursor-pointer rounded-r-md bg-red-400 px-1"
//                 onClick={() => handleDeleteTags(index)}
//               >
//                 <AiFillDelete size={17} className="my-auto" />
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="flex mt-4 ml-4">
//         <div className="flex text-center my-auto">Add user(s):</div>
//         <input
//           type="text"
//           placeholder="Username or Email"
//           value={searchUsers}
//           onChange={(e) => setSearchUsers(e.target.value)}
//           className="text-sm h-[30px] w-[300px] ml-2 pl-3 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-indigo-200"
//         />
//         {loadingUserBackend && (
//           <div className="flex items-center px-2">
//             <svg
//               aria-hidden="true"
//               className="mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
//               viewBox="0 0 100 101"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//                 fill="currentColor"
//               />
//               <path
//                 d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//                 fill="currentFill"
//               />
//             </svg>
//           </div>
//         )}
//       </div>
//       {filteredData.length !== 0 && (
//         <div className="mt-1 bg-white shadow-sm overflow-hidden overflow-y-auto w-[300px] max-h-[200px] outline-none border-none">
//           {filteredData.slice(0, 15).map((value, key) => {
//             return (
//               <div
//                 key={key}
//                 className="flex text-black items-center hover:bg-gray-100 hover:cursor-pointer"
//                 onClick={() => handleSelectUserFromSuggestion(value)}
//                 //href={value.link}
//               >
//                 <p className="ml-2">{value.title} </p>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default withUser(Setting);

////------------------------------------------------------------------------------

// const Setting = ({ user }) => {
//   const [filteredData, setFilteredData] = useState([]);
//   const [wordEntered, setWordEntered] = useState("");
//   const [selectedUser, setSelectedUser] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (wordEntered !== "") {
//       setLoading(true);
//       const delayDebounceFn = setTimeout(() => {
//         const newFilter = data.filter((value) => {
//           return value.title.toLowerCase().includes(wordEntered.toLowerCase());
//         });

//         setFilteredData(newFilter);

//         setLoading(false);
//       }, 1000);
//       return () => clearTimeout(delayDebounceFn);
//     } else {
//       setFilteredData([]);
//     }
//   }, [wordEntered]);

//   // const handleFilter = (event) => {
//   //   const searchWord = event.target.value;
//   //   setWordEntered(searchWord);
//   //   const newFilter = data.filter((value) => {
//   //     return value.title.toLowerCase().includes(searchWord.toLowerCase());
//   //   });

//   //   if (searchWord === "") {
//   //     setFilteredData([]);
//   //   } else {
//   //     setFilteredData(newFilter);
//   //   }
//   // };

//   // const clearInput = () => {
//   //   setFilteredData([]);
//   //   setWordEntered("");
//   // };

//   const handleDeleteTags = (removedIndex) => {
//     setSelectedUser([
//       ...selectedUser.filter((_, index) => index !== removedIndex),
//     ]);
//   };

//   const handleSelectUserFromSuggestion = (value) => {
//     setSelectedUser((old) => [...old, value]);
//     setFilteredData([]);
//     setWordEntered("");
//   };

//   return (
//     <div>
//       <div>
//         <ul className="flex overflow-hidden overflow-x-auto p-0 ml-2 text-xs">
//           {selectedUser.map((value, index) => (
//             <li
//               key={index}
//               className="flex flex-shrink-0 w-auto h-[32px] items-center justify-center text-white rounded-md mt-2 mx-1 bg-application-color"
//             >
//               <div className="px-2">{value.title}</div>
//               <div
//                 className="flex h-[32px] hover:cursor-pointer rounded-r-md bg-red-400 px-1"
//                 onClick={() => handleDeleteTags(index)}
//               >
//                 <AiFillDelete size={17} className="my-auto" />
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="flex mt-4 ml-4">
//         <div className="flex text-center my-auto">Add user(s):</div>
//         <input
//           type="text"
//           placeholder="Username or Email"
//           value={wordEntered}
//           onChange={(e) => setWordEntered(e.target.value)}
//           className="text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-indigo-200 h-[30px] w-[300px] ml-2 pl-3"
//         />
//         {loading && (
//           <div className="flex items-center px-2">
//             <svg
//               aria-hidden="true"
//               className="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
//               viewBox="0 0 100 101"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//                 fill="currentColor"
//               />
//               <path
//                 d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//                 fill="currentFill"
//               />
//             </svg>
//           </div>
//         )}
//         {/* <div className="bg-white- grid items-center">
//           {filteredData.length === 0 ? (
//             <AiOutlineSearch />
//           ) : (
//             <AiFillCloseCircle id="clearBtn" onClick={clearInput} />
//           )}
//         </div> */}
//       </div>
//       {filteredData.length !== 0 && (
//         <div className="mt-1 bg-white shadow-sm overflow-hidden overflow-y-auto w-[300px] max-h-[200px] outline-none border-none">
//           {filteredData.slice(0, 15).map((value, key) => {
//             return (
//               <div
//                 key={key}
//                 className="flex text-black items-center hover:bg-gray-100 hover:cursor-pointer"
//                 onClick={() => handleSelectUserFromSuggestion(value)}
//                 //href={value.link}
//               >
//                 <p className="ml-2">{value.title} </p>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default withUser(Setting);

////---------------------------------------------------------------------------------

// import withUser from "../service/auth/withUser";
// const Setting = ({ user }) => {

//   return (
//     <div className="flex max-w-[1240px] w-full mx-auto pt-4 font-bold px-4 mb-2">
//       Settings
//     </div>
//   );
// };

// export default withUser(Setting);
