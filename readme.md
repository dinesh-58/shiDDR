## Running locally
```sh
git clone
pnpm i
pnpm run dev
```

Then, open `http://localhost:5173/` in your browser

## TODOS
### functional (important)
- [x] store state of both boards' pads 
- [x] toggle state on click and show visually (toggle class to primary and secondary)
- [ ] auto-click algorithm for bot board
    - [ ] for now: create function that generates 3 random pad numbers and console log
    - [ ] create button for running this (repurpose into "new game / next level" button later)
    - [x] don't allow player to click bot board (set disabled cursor)
- [ ] store sequence of playerClicks in log array
    - [ ] compare with bot sequence and store result as winState
- [ ] decide whether to keep showing what pads bot toggled
- [ ] host on gh-pages when you're able to play just 1 round w/ bot
    - [ ] start using devel branch after that. main should be for deployed build
- [ ] store level, winState, and lives in state
    - [ ] reset board states at start of each level
    - [ ] increment botClick by 1 every level. set max limit of 9?

### do later
- [ ] ignore responsive for now. 
- [ ] put [this](https://daisyui.com/components/theme-controller/) in navbar
- [ ] when bot toggles a pad, play same animation used for click
- [ ] reminder to set cleanup f'ns for useEffect() s
- [ ] improve bot sequence algorithm to only select adjacent pads or ones that haven't been selected?

- [x] refactor `prop drilling` (setter functions for boards are being passed from App -> Board -> Pad)
    - [x] use context or merge Pad component into Board
    - [x] ~put tailwind classes into css file if that makes it look cluttered~ <br>
        button hover styles don't work properly using this method. prob because of DaisyUI

