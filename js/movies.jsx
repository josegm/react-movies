/** @jsx React.DOM */

var placeholder_image = "img/placeholder.jpg";
var api = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=[API_KEY]&page_limit=1&q=";
var requests = [];
var THROTTLE_MILISECONDS = 200; // 1000 / 200 = 5 requests/sec
var movie_titles = [
  "Captain Phillips",
  "The Phyladelphia Experiment",
  "The final countdown",
  "Sunshine",
  "About time",
  "The Newsroom",
  "Groundhog day",
  "The Wolverine",
  "Ender's Game",
  "Thor: The Dark World",
  "Out of the furnace",
  "The book thief",
  "12 years a slave",
  "House Of Cards",
  "Delivery Man",
  "Into the storm",
  "The Giver",
  "Interestelear",
  "Lucy",
  "The Equalizer",
  "2012",
  "Gone Girl",
  "Most wanted man",
  "What if",
  "The Interview",
  "The Maze Runner",
  "The Judge",
  "Last Vegas",
  "John Wick",
  "Hunt Season",
  "Righteous kill",
];

// throttle requests
setInterval(function() {
  if(requests.length > 0) {
    var request = requests.pop();
    if(typeof request === "function") {
      request();
    }
  }
}, THROTTLE_MILISECONDS);

var Movies = React.createClass({
  getInitialState: function() {
    return { movie_titles: movie_titles, movies: [] }
  },

  componentDidMount: function() {
    this.setState({
      movies: this.state.movie_titles.map(function(m) {
        return {
          title: m,
          url: '#',
          image_url: placeholder_image
        }
      })
    });

    var self = this;
    this.state.movie_titles.map(function(m) {

      requests.push(function() {
        $.ajax({
          url: api + m,
          dataType: "jsonp",
          success: function(result) {
            var movies = self.state.movies;
            var updatedMovies = []
            for(var index in movies) {
              if(movies[index].title === m && result.movies.length>0) {
                updatedMovies.push({title: movies[index].title,
                                   url: result.movies[0].links.alternate,
                                   image_url: result.movies[0].posters.detailed})
              } else {
                updatedMovies.push(movies[index])
              }
            }
            self.setState({movies: updatedMovies });
          }
        })
      });
    });
  },

  render: function() {
    return (
      <ul>
        {
          this.state.movies.map(function(m) {
            return <MovieWrapper key={m.title} movie={m} />
            })
        }
      </ul>
    );
  }
});

var MovieWrapper = React.createClass({
  render: function() {
    return (
      <li>
        <a href={this.props.movie.url}>
          <img key={this.props.movie.title} src={this.props.movie.image_url} title={this.props.movie.title} />
        </a>
      </li>
    )
  }
});

React.render(<Movies />, mount_movies)
