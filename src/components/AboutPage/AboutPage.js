import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div className="container">
    <div>
      <h1>About Spice-rack</h1>
      <p>One thing I have always found hard to to remember all the spices I own while out shopping.
        I would always buy repeat spices or completely miss the ones I actually needed. Another issue as spices would go bad if 
        I could not use them all in time. Thats where Spice-rack some into play! 
        <br/>
        Spice-rack is a mobile first app that helps you keep track of all the spices you have in your kitchen. You can categorize all your spices
        You can add more or remove used up ones. It also keeps track of expiration dates and you can see if any of your spices need to be used up or thrown away.
        Finally you can look up recipes that use a spice on your Spice-rack.   
      </p>
    </div>
  </div>
);

export default AboutPage;
