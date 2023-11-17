## Running locally
```sh
git clone
pnpm i
```

Then, open `http://localhost:5173/` in your browser

## TODOS
### functional (important)
- [x] store state of both boards' pads 
- [x] toggle state on click and show visually (toggle class to primary and secondary)

- [ ] auto-click algorithm for bot board
    - [ ] don't allow player to click bot board (set disabled cursor)
- [ ] store level, winState, and lives in state

### do later
- [ ] ignore responsive for now. 
- [ ] put [this](https://daisyui.com/components/theme-controller/) in navbar
- [ ] reminder to set cleanup f'ns for useEffect() s
- [x] refactor `prop drilling` (setter functions for boards are being passed from App -> Board -> Pad)
    - [x] use context or merge Pad component into Board
    - [x] ~put tailwind classes into css file if that makes it look cluttered~ <br>
        button hover styles don't work properly using this method. prob because of DaisyUI

