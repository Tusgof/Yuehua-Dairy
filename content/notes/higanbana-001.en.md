---
project: higanbana
number: "001"
title: "The first day I let the bot trade on its own"
subtitle: "First light — SPY 0DTE"
date: "2026-06-12"
status: active
summary: "The first day I actually flipped the system live after three months of backtesting. My hands shook more than I expected, and the first day taught me more about myself than about the strategy."
sample: true
tags: [spy, 0dte, options, systematic, journal]
metrics:
  - label: "Trades"
    value: "6"
  - label: "Win rate"
    value: "66.7%"
    direction: up
  - label: "Net PnL"
    value: "+$184"
    direction: up
  - label: "Max DD"
    value: "-$92"
    direction: down
---

Today I pressed *live* for the first time. Not paper anymore. My hands shook more than I thought they would, even after three months of backtesting. Numbers on a page and real money in the account are simply not the same feeling.

I named this project **Higanbana** — the red spider lily, the flower the Japanese believe blooms along the road to the afterlife. I love what it stands for: beautiful, but a reminder to let go. Which is exactly what systematic trading asks of you — let the system work, and keep your hands off it.

## What I did

I ran version `v8.2`, the parameters I locked last week. The rules, in short:

- Only enter between 10:00–14:30 ET
- Open a position when IV rank is below the threshold and price breaks the opening range
- Hard stop at 1.5R, no exceptions

## What I found

The system took 6 trades — 4 wins, 2 losses — close to what the backtest promised (around 63%). But what I hadn't braced for was that **both losses landed back to back** in the afternoon. That was the moment my finger drifted toward the override button.

| Time | Result | R |
| --- | --- | --- |
| 10:12 | Win | +1.0 |
| 11:03 | Win | +1.0 |
| 12:47 | Loss | -1.5 |
| 13:05 | Loss | -1.5 |
| 13:58 | Win | +1.0 |
| 14:20 | Win | +1.0 |

> The system didn't break when it lost money. It nearly broke when *I* couldn't bear to watch it lose.

## Problems

1. **Latency** on order submission ran 300–500ms slower than the backtest, so real fills were worse than simulated.
2. My logging isn't good enough yet — I had to record by hand, which is slow and error-prone.

## Next steps

- Write a logger that pushes everything into a database automatically.
- Measure real slippage for two weeks before deciding how to model it.
- Most important: **do not touch the override button.** I'll treat every urge to press it as a signal that I don't yet trust the system enough.

Day one closed slightly green. But the lesson wasn't the number — it was seeing myself in the mirror under pressure, and realising how much discipline I still have to build.
