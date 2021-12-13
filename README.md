# View Counter

This is simple solution to count your views in your pages with analytics.

### Team

| Name         | Github        | Twitter     |
| ------------ | ------------- | ----------- |
| Rohtih Gilla | Rohithgilla12 | gillarohith |

### Tech Stack

- Next JS
- Supabase
- Chakra UI
- Supabase UI

### Schema

![https://i.imgur.com/ooLdwJm.png](https://i.imgur.com/ooLdwJm.png)

### Loom Video

[https://www.loom.com/share/1901efa4be3a41c498bf851c1c3b23cc](https://www.loom.com/share/1901efa4be3a41c498bf851c1c3b23cc)

### What all features of Supabase does this app use?

This application uses two of the Supabase features

- Supabase Auth
- Supabase Database

It also uses @supabase/ui, it made life eaiser by not touching the authentication design 😇

It uses supabase auth google sign in method, there are many different ways to sign in but sticked to the only method.

It leverages the power of PostgreSQL database which supabase provide :smile:

### Breif Description

Users can give a URL which they want to count views, they can also give a slug.

What we generate is an iFrame or an png that can be plugged into their website.

Whenever the website is hit, it increments the count and shows the count in the iFrame or the png.

The iFrame and png is generated using Next JS Serverless functions.

### Images

Creation Page

![https://i.imgur.com/bjA1hMs.png](https://i.imgur.com/bjA1hMs.png)

Here you can create a link, once genereated it gives you a embed link for iFrame.

Stats Page

![https://i.imgur.com/UfE7mLK.png](https://i.imgur.com/UfE7mLK.png)

You can see the stats of the link.

iFrames in action

![https://i.imgur.com/Fgh4eAo.png](https://i.imgur.com/Fgh4eAo.png)

![https://i.imgur.com/4llRlnM.png](https://i.imgur.com/4llRlnM.png)

PNGs in action

Thanks
Rohith Gilla
