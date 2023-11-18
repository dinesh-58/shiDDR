## Running locally
```sh
git clone https://github.com/dinesh-58/shiDDR
pnpm i
pnpm run dev
```

Then, open `http://localhost:5173/` in your browser

## TODOS
### functional (important)
- [x] store state of both boards' pads 
- [x] toggle state on click and show visually (toggle class to primary and secondary)
- [x] auto-click algorithm for bot board
    - [x] for now: create function that generates 3 random pad numbers and console log
    - [x] create button for running this (repurpose into "new game / next level" button later)
    - [x] don't allow player to click bot board (set disabled cursor)
- [x] ensure generated sequnce doesn't have duplicate numbers
- [x] toggle bot pads based on generated sequence

- [ ] compare player click with botSequence
    - [x] generate only one id for botSequence for now
    - [ ] keep generating until full, no need to compare player click for now (use interval)
    - [ ] shift() from botSequence (i.e. remove oldest pad in botSequence) regardless if player click was right or wrong 
        - [ ] ?? toggle shifted pad?
            - [ ] for now, keep doing till bot board is fully enabled
        - [ ] ?? toggle player's clicked pad? because bot might generate previously generated pad that it has disabled but player may still have enabled (need to maintain visual consistency and also, I might compare pad states, not just pad id)
            - [ ] one way would be set enabled for very short period of time. upon clicking, btn goes from neutral to primary to neutral

- [ ] when bot toggles a pad, play same animation used for click (use setTimeout to show slowly)
- [ ] host on gh-pages when you're able to play just 1 round w/ bot
    - [ ] start using devel branch after that. main should be for deployed build

- [ ] decide whether to keep showing what pads bot toggled
- [ ] store level, winState, and lives in state
    - [ ] reset board states at start of each level
    - [ ] increment botClick by 1 every level. set max limit of 9?

### do later
- [ ] ignore responsive for now. 
- [ ] put [theme toggle](https://daisyui.com/components/theme-controller/) in navbar
- [ ] store high score in localStorage? not much of a point if setting max limit to 9
    - [ ] maybe different bot seqeunce algorithms can act as difficulty settings 
    ```
    easy: only adjacent or diagonal selected
    medium: random selected (random ids always unique)
    hard: random (not unique so if same number comes up twice, bot can just toggle it on, then off. if final sequence persists, it can serve to confuse player. feature, not a bug)
    ```
- [ ] reminder to set cleanup f'ns for useEffect() s if any used
- [ ] improve bot sequence algorithm to only select adjacent pads or ones that haven't been selected?

- [x] refactor `prop drilling` (setter functions for boards are being passed from App -> Board -> Pad)
    - [x] use context or merge Pad component into Board
    - [x] ~put tailwind classes into css file if that makes it look cluttered~ <br>
        button hover styles don't work properly using this method. prob because of DaisyUI

