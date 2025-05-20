# 🏰 Codrops Fan Museum 🖼️

**[Demo on Codrops](https://tympanus.net/Tutorials/CodropsFanMuseum/)** | **[Blender file](https://drive.google.com/file/d/1_DhUPpQ_vdWxHgDrgfKdy5_zkZ9bZ2v7/view?usp=sharing)** | **[YouTube video](https://youtu.be/R6yppleutsQ)** | **[Codrops article](https://tympanus.net/codrops/2025/04/08/3d-world-in-the-browser-with-blender-and-three-js/)**
| **[Live site](https://codrops-fan-museum.com/)**

This repo contains code of a fan museum for Codrops!

![Page screenshot](public/media/og-image.webp?raw=true "Page screenshot")

# Instructions

```
npm install
npm run dev
```

# Updates & Corrections

If you see something wrong in the article please let me know!! I'll post a list of corrections and/or updates for the code and article here~ Thank you in advance!

- When it comes to "bad" topology, sometimes it's actually good for optimization as in, it may have less verticies and geometry data which saves on file size. You may also use bad toplogy in certain scenarios as a "trick" to have a certain effect. Of course bad topology can do the opposite as well, as in, if it's really bad it will cause issues (lighting/shading, performance, etc).
- You'll see a lot of websites also use other file formats like .jpg and there are pros and cons to that. For one .jpg is more widely supported and WebP has additional time to decode so it really kind of depends on your use case. I'm using solid baked textures so I'm aiming for max compression with WebP and KTX rather than .jpg which might be ideal for more granular details or normal textures etc.
- Because GLTF/GLB is basically a glorified JSON object storing things like vertex positions, you might see a lot of websites use .bin files or .JSON files or some other custom vertex data format rather than a GLB file. However, GLBs are still very common to use.
- Ignore the curve rotation section with the create functional spline, I did not end up using that method. Simplified it way more.
- You shouldn't use useState. I did because I wanted to save time. For something like scrollProgress we could use useRef() for better performance.

# 🥰🥰 Inspo & Credits!!! 🥰🥰

Of course huge shoutout to the whole community for making things possible!! Three.js and Blender are so so amazing!!! Here are a list of the original creators for some of the things I used in this project:

- [The Adam | Blender techniques](https://www.youtube.com/watch?v=gw885XAKYiI)
- [sketching in blender | Blender techniques](https://youtu.be/JSuWu4EXVZw)
- [PolyHaven | Blender HDRI & Textures/PBR materials](https://polyhaven.com/)
- [BlenderKit | Textures/PBR materials](https://www.blenderkit.com/get-blenderkit/)
- [ambientCG | Textures/PBR materials](http://ambientcg.com/)
- [Fire Shader](https://codesandbox.io/p/sandbox/3878x)
- [Background music](https://www.epidemicsound.com/track/an7vU7AM16/)
- [Thump SFX](https://pixabay.com/sound-effects/massive-thump-116359/)
- [Torch SFX](https://pixabay.com/users/freesoundsxx-47251115/)
- [Font](https://fonts.google.com/specimen/Eagle+Lake?query=eag)
- [DivyeSh's torch model](https://sketchfab.com/3d-models/torch-d47f1a85c4c846a392cc1d1afca15295)
- [distant_voices' lectern model](https://sketchfab.com/3d-models/lectern-17562d27f70b4b4a834cd778cd5e6c06)
- [Sky_Hunter's medieval brazier model](https://sketchfab.com/3d-models/medieval-brazier-cff29e533e3a4298a5d112cf7bb2558c)
- [GremorySaiyan's bird model](https://sketchfab.com/GremorySaiyan)

# More tools~

See all tools on the [Codrops article](https://tympanus.net/codrops/2025/04/08/3d-world-in-the-browser-with-blender-and-three-js/)!
