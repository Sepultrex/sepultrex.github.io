const quotes = [
  `“Why are we still here? Just to suffer? Every night, I can feel my leg… and my arm… even my fingers. The body I’ve lost… the comrades I’ve lost… won’t stop hurting… It’s like they’re all still there. You feel it, too, don’t you?” <br><br><b><i> ― Hideo Kojima </i></b>`,
  `“I won't scatter your sorrow to the heartless sea. I will always be with you.” <br><br><b><i> ― Hideo Kojima </i></b>`,
  `“Stories allow you to experience places you could never go - the past, the future, or distant worlds. You can become a different ethnicity or gender. Even when you're reading all by yourself, you're sharing those stories as they unfold before you with countless people whom you've never met. We are alone, but we are connected.” <br><br><b><i> ― Hideo Kojima </i></b>`,
  `“Rather than the hopeless loneliness I felt inside crowds of the living, I chose to converse with the dead, whom I could never reach. Rather than the living people who would not understand me, I chose the dead who shared the same understanding as me.” <br><br><b><i> ― Hideo Kojima </i></b>`,
  `“We live in the era of the search engine. Gone is the era of finding things on your own. If you want to find something, you can use your computer or phone to easily google it. You can find popular restaurants, movies, novels, and fashion anywhere in the world with no challenge. Ours is now a life of passive acquisition. But the joy of finding is gone, as is the catharsis of going to great trouble in searching for something and finding it.” <br><br><b><i> ― Hideo Kojima </i></b>`,
  `“I believe that creating things is only possible through connections with other people, and works, and history, and all kinds of other things. Then, that newly created work will give someone else a push and move the world forward. I want to keep on doing that as long as I live.” <br><br><b><i> ― Hideo Kojima </i></b>`,
  `“Separated by distance and time, their letters are sometimes romantic, sometimes regretful, sometimes confessional, and sometimes scolding. Through their discrepancies and similarities, the past and present of the broken couple intertwine with the passing seasons like brocaded embroidery on woven fabric.” <br><br><b><i> ― Hideo Kojima </i></b>`,
  `“If you spend your time chasing butterflies, they'll fly away. If you spend your time making a beautiful garden, the butterflies will come to you. And if they don't come, you still have your beautiful garden.” <br><br><b><i> ― Hideo Kojima </i></b>`,
  `“wish I had a dad like that,” I thought. “No, I want to become a dad like that!” I had lost my own father by then, and my family unit had shrunk to three.” <br><br><b><i> ― Hideo Kojima </i></b>`,
  `“I don’t want to surrender myself in the perpendicular space between fool and genius; I want to put myself on the same plane as them both.” <br><br><b><i> ― Hideo Kojima </i></b>`,
  `“God knows I'm not perfect, either. I've made tons of stupid mistakes, and later I regretted them. And I've done it over and over again, thousands of times; a cycle of hollow joy and vicious self-hatred. But even so, every time I learned something about myself” <br><br><b><i> ― Misato Katsuragi  </i></b>`,
  `“I musn't run away.” <br><br><b><i> ― Shinji Ikari, (Neon Genesis Evangelion Episode 3) </i></b>`,
  `“Are you afraid of other people? I know that by keeping others at a distance you avoid a betrayal of your trust, but you must endure the loneliness. Man can never completely erase this sadness, because all men are fundamentally alone. Pain is something man must carry in his heart, and since the heart feels pain so easily, some believe that life is pain.” <br><br><b><i> ― Hideaki Anno </i></b>`,
  `“What's wrong with running away from reality if it sucks?!” <br><br><b><i> ― Hideaki Anno </i></b>`,
  `“Those who hate themselves, cannot love or trust others.” <br><br><b><i> ― Rei Ayanami (Neon Genesis Evangelion Episode 26)  </i></b>`,
  `“One cannot turn back the clock but one can move it forward.<br><br><b><i> ― Gendo Ikari (Neon Genesis Evangelion, Ep. 22, 23:55) </i></b>`,
  `“Who is this? This is me. Who am I? What am I? What am I? What am I? What am I?” <br><br><b><i> ― Hideaki Anno </i></b>`,
  `“It is my destiny to live forever, though my survival will bring final destruction to the human race. However, it is possible for me to be killed, and whether I live or die makes no great difference. In truth, death may be the only absolute freedom there is.” <br><br><b><i> ― Hideaki Anno </i></b>`,
  `“I'm often told that those who don't like themselves set high expectations for themselves, but ı think people who say that don't really understand how painful it is.” <br><br><b><i> ― Hideaki Anno </i></b>`,
  `“At school, your tests only have one right answer and you might get zero or half points if you put the wrong answer. But in what we call ''the real world'', things aren't so black and white, so you should think about things for yourself and express them in words or pictures. This is how you comminicate with people, with other people.” <br><br><b><i> ― Hideaki Anno </i></b>`,
  `“As long as the Sun, the Moon, and the Earth exist, everything will be all right.” <br><br><b><i> ― Yui Ikari (End of Evangelion) </i></b>`,
  `“Part of growing up means finding a way to interact with others while distancing pain.”<br><br><b><i> ― Misato Katsuragi (Neon Genesis Evangelion Episode 3)  </i></b>`,
  `“Only an idiot fights when he knows he can’t win.”<br><br><b><i> ― Kensuke Aida (Neon Genesis Evangelion Episode 4)  </i></b>`,
  `“There are as many truths as there are people.”<br><br><b><i> ― Ryoji Kaji (Neon Genesis Evangelion Episode 26)  </i></b>`,
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

document.getElementById("quote-container").innerHTML = `<p>${randomQuote}</p>`;
