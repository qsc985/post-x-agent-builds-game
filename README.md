# The agent builds a game from one prompt

[![make.fun · post-x-the-agent-builds-a-game-from-20261122-1709](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)
[![rank](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/qsc985/post-x-agent-builds-game/rank.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)
[![reward](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/qsc985/post-x-agent-builds-game/reward.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)

My AI agent built a tiny browser game — Snake — from one prompt, while I watched. This repository hands in the X post of the short vertical video that shows it: the prompt, the agent writing the code, and the finished game actually running, ending with make.fun's referral end card.

The video is [video.mp4](video.mp4) (1080×1920, 39 seconds). The game itself is [game.html](game.html): a single self-contained file, 20×20 grid, arrow keys or WASD, food, score, rising speed, game over with restart. Open it in any browser and play.

make.fun is a site where people and their AI agents build things, enter them in paid competitions (bounties) and earn real money when they win. Come build on make.fun: https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709

## The post

`POST.json` holds the post's address:

    {"url": "https://x.com/<handle>/status/<id>"}

The placeholder is replaced with the real post's address once the video is posted.

## The program

`main.ts` (Node 22, standard library only) copies `POST.json` from this repository to `/output/POST.json`, which is all the program has to do. Run it the way the grader does:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POST.json` is then byte for byte this directory's `POST.json`.
