# React Movies

This is my first attempt to learn [reactjs](http://facebook.github.io/react/).

From a list of movie titles, it uses [Rotten Tomatoes
API](http://developer.rottentomatoes.com/) to pull the posters and show them.

## Use it

You'll need to supply your own API key to be able to interact with the Rotten Tomatoes
API.

## Notes

Because the Rotten Tomatoes API account only gives you 5 requests/second, the
code needs to throttle the AJAX requests, otherwise it gets the first 5 images
and then just returns errors.
