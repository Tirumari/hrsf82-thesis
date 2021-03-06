const faker = require('faker');
const fetch = require('isomorphic-fetch');
const promise = require('es6-promise');

const { Pool, Client } = require('pg');

/************************************************************************
POSTGRES METHODS
************************************************************************/

var pool = new Pool({
    database: 'tweeter',
    password: ''
  })
  
const client = new Client({
  database: 'tweeter',
  password: ''
})
client.connect();

pool.connect(function(err, client, done) {
    if (err) {
        console.log('could not connect');
    }
    console.log('connected to db');
    done();
})

// var addTweet = function(user_id, message, created_at, views, likes, retweets, replies, impressions) {
//   const text = 'INSERT INTO tweets (user_id, message, created_at, views, likes, retweets, replies, impressions) VALUES($1, $2, $3, $4, $5, $6, $7, $8)'
//   const values = [user_id, message, created_at, views, likes, retweets, replies, impressions];
  
//   client.query(text, values, (err, res) => {
//       if (err) {
//       console.log('error inserting into db', err);
//       } else {
//           console.log('inserted tweet');
          
//       }
//   })
// }

/*******************************************************************************************************************************
RANDOM VALUE GENERATORS *******************************************************************************************************************************/

var messageGenerator = function() {
	var randomElement = function(array){
	  var randomIndex = Math.floor(Math.random() * array.length);
	  return array[randomIndex];
	};

	var opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'quickly', 'last night i', 
	'the president', 'that wizard', '', '', 'robots', 'that kangaroo', 'marsupials', 'almost', 'gracefully', '', 'elegantly', 'totally', 'Victor', 
	'Lebron James', 'aliens', 'programmers', 'ghosts', 'dinosaurs', 'the illuminati', 'Yuheng', 'Tim Hoang', 'Kyrie Irving', 'Giannis Antetokounmpo', 
	'Kevin Durant', 'Kurt Godel', 'Anuar', 'the government', 'Joel Embiid', 'computers', 'Wittgenstein', 'Steph Curry', 'Reggie Miller', 
	'James Harden', 'Russell Westbrook', 'Hoodie Melo', 'Kristaps Porzingis', 'Michael Jordan', 'Blake Griffin', 'Lonzo Ball', 'Ben Simmons', 
	'Paul George', 'Klay Thompson', 'Socrates', 'Plato', 'Aristotle', 'Tolstoy', 'Bertrand Russell', 'Fred', 'Aquinas', 'sloths', 'koalas', 
	'the intelligentsia', 'the bourgeoisie', 'tomorrow i will have', 'furiously', 'cautiously', 'quietly', 'humbly', 'gallantly', 'nonchalantly', 
	'calmly', 'blissfully', 'finally', 'eventually', 'realistically', 'desperately', 'abruptly', 'willfully', 'endlessly', 'delightfully', 'wearily', 
	'beatifully', 'thruthfully', 'weirdly', 'uneasily', 'cheerfully', 'expertly', 'randomly', 'wholeheartedly', 'briefly', 'briskly', 'uncontrollably'];
	var verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'enjoyed', 
	'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed', 'hacked', 
	'reverse engineered', 'generated', 'resurrected', 'stupified', 'crossed over', 'dunked on', 'demolished', 'destroyed', 'posterized', 
	'overcame', 'processed', 'implemented', 'confronted', 'celebrated', 'collaborated with', 'frightened', 'loved', 'discovered', 'admired', 
	'praised', 'studied', 'dreamed of', 'mesmerized', 'hypnotized', 'disregarded', 'contemplated', 'ridiculed', 'interpolated', 'tricked', 
	'lied to', 'confessed to', 'judged', 'complimented', 'fooled', 'improved upon', 'disintegrated', 'engaged with', 'altered', 'arranged', 
	'believed', 'changed', 'conferred with', 'constructed', 'developed', 'conjured', 'rejected', 'approved', 'called out', 'helped', 'assisted', 
	'declined', 'resusitated', 'listened to', 'watched', 'followed', 'befriended', 'antagonized'];
	var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of', 'a retro', 'some classic', 
	'a brand new', 'an archaic', 'a glorious', 'a basic', 'an intricate', 'a revolutionary', 'a paradigmatic', 'a philosophical', 
	'a transcendental', 'an apocalyptic', 'a prophetic', 'a lucky', 'the paradigmatic', 'a cosmic', 'a reincarnated', 'a responsible', 'a reckless', 
	'a remarkable', 'a clever', 'a mind-boggling', 'a genuine', 'a friendly', 'a bonafide', 'a sincere', 'a dubious', 'a puzzling', 'a heoric', 
	'a devious', 'a disastrous', 'a productive', 'a pluripotent', 'a versatile', 'a flexible', 'a rigid', 'a focused', 'a singluar', 'a mythic', 
	'an industrialized', 'a curious', 'an inquisitive', 'an analog', 'a scientific', 'a pseudo-scientific', 'an undercover', 'a popular', 
	'a blissful', 'a peculiar', 'a wistful', 'a dreamy', 'a renegade', 'a rebellious', 'a lazy', 'an energized', 'a rambunctious', 
	'an uncontrollable', 'a dignified', 'a local', 'a cosmopolitan', 'a lovely', 'a kindly', 'a futuristic', 'an aesthetic'];
	var nouns = ['dog', 'water', 'system', 'city', 'worm', 'cloud', 'radish', 'money', 'way of life', 'belief system', 'security system', 
	'bad decision', 'future', 'life', 'history', 'mind', 'Lebron James', 'alien', 'programmer', 'ghost', 'dinosaur', 'the illuminati', 'Yuheng', 
	'Tim Hoang', 'Kyrie Irving', 'Giannis Antetokounmpo', 'Kevin Durant', 'Kurt Godel', 'Chipotle', 'Taco Bell', 'Backbone.js', 'React', 'AngularJS', 
	'Anuar', 'the government', 'Joel Embiid', 'computer', 'mid-life crisis', 'bicycle', 'intellect', 'novel', 'Wittgenstein', 'Steph Curry', 
	'Reggie Miller', 'James Harden', 'Russell Westbrook', 'Hoodie Melo', 'Kristaps Porzingis', 'Michael Jordan', 'Blake Griffin', 'Lonzo Ball', 
	'Ben Simmons', 'Paul George', 'Klay Thompson', 'Socrates', 'Plato', 'Aristotle', 'Tolstoy', 'Bertrand Russell', 'Fred', 'Aquinas', 'table', 
	'car', 'cow', 'mountain', 'sea', 'phone', 'battery', 'television', 'glacier', 'tree', 'forest', 'mountain range', 'desert', 'ice cream sundae', 
	'koala', 'sloth'];
	var tags = ['#techlife', '#burningman', '#sf', 'but only i know how', 'for real', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '', '', '', '', 
	'#aliensbuiltthepyramids', '#flatearth', '#illuminati', 'i think', '#isaacnewton', '#nbatwitter', '#basic', '#sad', '#shame', '#realmvp', 
	'#conspiracy', '#googledeepmind', '#trusttheprocess', '#samhinkie', '#elonmusk', '#tesla', '#google', '#startuplife', '#computers', 
	'#transhumanism', '#thesingularityisnigh', '#postmodernism', '#happyhalloween', '#empiricism', '', '', '', '', '#lifeofthemind', '#yes', '#mvp', 
	'#bayarea', '#decartes', '#classic', '#standard', '#ballislife', '#epluribusunum', '#nba2k', '#thelifeaquatic', '#organic', '#yoga', 
	'or so i heard', '#bravenewworld', '#fastandfurious', '#fifa', '#nba', '#youtube', '#facebook', '#hastag', '#twitter', '#tweeter'];

	var message = [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)];
	var properNouns = ['Lebron James', 'the illuminati', 'Yuheng', 'Tim Hoang', 'Kyrie Irving', 'Giannis Antetokounmpo', 'Kevin Durant', 
	'Kurt Godel', 'Chipotle', 'Taco Bell', 'Backbone.js', 'React', 'AngularJS', 'Anuar', 'the government', 'Joel Embiid', 'Wittgenstein', 
	'Steph Curry', 'Reggie Miller', 'James Harden', 'Russell Westbrook', 'Hoodie Melo', 'Kristaps Porzingis', 'Michael Jordan', 'Blake Griffin', 
	'Lonzo Ball', 'Ben Simmons', 'Paul George', 'Klay Thompson', 'Socrates', 'Plato', 'Aristotle', 'Tolstoy', 'Bertrand Russell', 'Fred', 'Aquinas'];

	if (properNouns.includes(message[3]) && message[2][0] !== 'a') {
		message.splice(2, 1);
	}

	return message.join(' ').trim();
};

var numberGenerator = function(n) {
	return Math.floor(Math.random() * n);
};

var dateGenerator = function() {
	// Only produce dates from August - October 2017
	var day = numberGenerator(31);
	while (day === 0) {
		day = numberGenerator(31);
	}

	var months = [9, 8, 7];
	var randomMonth = months[numberGenerator(months.length)];
	var randomDay = day;
	var randomHour = numberGenerator(24);
	var randomMinute = numberGenerator(60);
	var randomSecond = numberGenerator(60);

	var d = new Date(2017, randomMonth, randomDay, randomHour, randomMinute, randomSecond);
	return d.toString();
};

var userGenerator = function() {
	// This function ensures that publishers are much more likely to tweet than regular users
	var user;
	var randomNumber = numberGenerator(100);

	// if (randomNumber <= 7) {
	// 	var randomIndex = numberGenerator(publishers.length);
  //   user = publishers[randomIndex];
	// } else {
  user = numberGenerator(500000);
  while (user === 0) {
    user = numberGenerator(500000);
  }
	return user;
};

/*******************************************************************************************************************************
TWEET GENERATOR *******************************************************************************************************************************/

var tweetGenerator = function() {
	// Generate semi-plausible metrics
	var impressions = numberGenerator(5000000);
	var views = Math.floor((impressions / 10) * Math.random());
	var likes = Math.floor((impressions / 50) * Math.random());
	var replies = Math.floor((impressions / 500) * Math.random());
	var retweets = Math.floor((impressions / 250) * Math.random());

	var tweet = {
		userId: userGenerator(),
		message: messageGenerator(),
		createdAt: dateGenerator(),
		views: views,
		likes: likes,
		retweets: retweets,
		replies: replies,
		impressions: impressions
	}
	return tweet;
};

const write = (user_id, message, created_at, views, likes, retweets, replies, impressions, count) => {
	return new Promise(function(resolve, reject){
		const text = 'INSERT INTO tweets (user_id, message, created_at, views, likes, retweets, replies, impressions) VALUES($1, $2, $3, $4, $5, $6, $7, $8)'
	  const values = [user_id, message, created_at, views, likes, retweets, replies, impressions];
	  
	  client.query(text, values, (err, res) => {
      if (err) {
        console.log('error inserting into db', err);
        reject(err);
      } else {
        console.log('successful POSTGRES insert with tweet batch: ' + count);
        resolve();
      } 
    });
	});
};

var tweets = [];
var count = 0;
// db.clearTweets();

var tweetRun = async () => {
	while (count < 2500000) {
		var tweet = tweetGenerator();

	  tweets.push(tweet);
		
		await write(tweet.userId, tweet.message, tweet.createdAt, tweet.views, tweet.likes, tweet.retweets, tweet.replies, tweet.impressions, count);
		count++;

		if (count % 5000 === 0) {
			console.log('5000 tweets! Count: ' + count);
		}
	  
	  // if (tweets.length === 5000) {
	  //   console.log('5000 tweets! Count: ' + count);
	  //   write(tweets);
	  //   tweets = [];
	  // }
	}
}

tweetRun();
