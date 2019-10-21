# audiosync

An audio player allowing you switch tracks keeping the same timestamp.

[Download](https://raw.githubusercontent.com/pellul/audio-sync/dist/index.js)
🔀
[Example](https://github.com/pellul/audio-sync/examples/index.html)

## Usage

```html
<script src="syncaudio.js"></script>
<script>
  audioSync([
    ['file-a.mp3', 'track1-A'],
    ['file-b.mp3', 'track1-B'],
    ['file-c.mp3', 'track1-C']
  ]);
</script>
```

### Instanciation

To instanciate a new player, use the provided `audioSync()` method.

This method needs an array of couples `[fileLocation, element]` with
***fileLocation*** being a *string*, and ***element*** being any
[HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) or
a string of the targeted HTMLElement *id*.

#### Example

```javascript
audioSync([
  // 'track-en' will be converted to document.getElementById('track-en')
  ['english-version.mp3', 'track-en'],
  ['french-version.mp3', document.getElementById('track-fr')]
]);
```

### Controls

Clicking an element while its track is `paused` will start `playing` it and will
pause all the other tracks (and the all the other audio players instances with
it).

Clicking an element while its track is `playing` will pause it.

### Bindings

The HTMLElement is bound to the track once the track has finished loading.

Once all the tracks are available and ready to play, the player is set to
**ready** and thus make it controllable.

If one of the track fails loading, then no binding occurs.

### Customization

The HTMLElements will receive a class when its bound track state changes.

| Class     |  When                      |
| :-------- | :------------------------- |
| `loading` | The track is being fetched |
| `paused`  | The track is not playing   |
| `playing` | The track is playing       |
| `failed`  | An error has occured*      |

\**This might happen when the sound file is not reachable or readable*

### Browser Compatibility and File Format Support

#### Retrocompatibility

Under the hood, audio-sync is using browser's native
[HTMLAudioElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)
to play the tracks.\
audio-sync *should* support IE9 and every recent browser (tests required).\
For more details → [See browser compatibility](https://caniuse.com/#feat=mdn-api_htmlaudioelement)

#### Audio file formats

| Format |     |
| -------| --- |
| MP3    | [See more](https://caniuse.com/#feat=mp3) |
| OGG    | [See more](https://caniuse.com/#feat=ogg-vorbis) |
| AAC    | [See more](https://caniuse.com/#feat=aac) |
| FLAC   | [See more](https://caniuse.com/#feat=flac) |
| WAV    | [See more](https://caniuse.com/#feat=wav) |

Or take a look at [W3School compatibility table](https://www.w3schools.com/tags/tag_audio.asp)

## Contribute

Feel free to [report a bug](https://github.com/pellul/audio-sync/issues/new) or to
provide any kind of improvement or fix through
[pull request](https://github.com/pellul/audio-sync/compare).

### Setup the project

```shell
git clone https://github.com/pellul/audio-sync.git
npm install
```

### Build

```shell
npm run build
```

This will generate a `index.js` minified file in the `dist/` folder.
