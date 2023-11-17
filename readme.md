## Running locally
```sh
git clone
pnpm i
```

Then, open `http://localhost:5173/` in your browser

## TODOS
### functional (important)
- [ ] store state of both boards' pads and change on click
- [ ] auto-click algorithm for bot board
    - [ ] don't allow player to click bot board (set cursor)
- [ ] store level, winState, and lives in state

### do later
- [ ] ignore responsive for now. 
- [ ] put [this](https://daisyui.com/components/theme-controller/) in navbar
- [ ] refactor `prop drilling` (setter functions for boards are being passed from App -> Board -> Pad)
    - [ ] use context or merge Pad component into Board
    - [ ] put tailwind classes into css file if that makes it look cluttered
