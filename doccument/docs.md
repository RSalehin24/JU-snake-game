# Intro
> This repository contains implementation of a snake game. Different features has been implemented in different branches. For workshop the student will be given "first-step" to implement different features. Students will implement the "Initial Mode" and "Challenges" throughout their workshop session. Branch name in ,which the feature has been implemented, is given by ":branch_name" inside first bracket. In "Challenges" each challenge's index is its difficulty level.

## First Step (:first-step)
- Head color is same as body
- Apple's position is static
- Snake cannot eat the apple
- Score doesn't increase (as snake can't eat the apple)
- Snake can move backward
- Snake's position changes everytime a game is started
- Snake should kill itself if it hits the edges of the board

## Initial Mode (:initial-mode)
> The changes of features and new features in initial-mode compare to first-step

- Head color is different to body 
- Snake can eat the apple
- Apple's position is dynamic and random and stays until the snake eats it.
- Score increases as snake eats the apple
- Snake's body doesn't increases as it eats the apple
- Snake can't move backward
- Snake position doesn't changes everytime the game started
- Snake doesn't get killed by hitting itself

## Challenges
1. Snake increases in size by one unit everytime it eats one apple (:snake-size-increase)
 
2. Snake moves through the edges to their opposite edge in a circular way (:cirular-way)

3. Snake gets killed by hitting itself (:killed-by-hitting-itself)

4. If the snake hits its body, then the remaining part of the body disappears from the hitting spot but the snake doesn't die. (:snake-body-disappear)

5. There is a reset button above the top-right corner of canvas which resets the game. (:reset)

6. The speed of snake increases with the score. (:increase-speed)

7. Another apple called 'booster apple' is added to the game. Booster apple appears in random places after eating every 5 apples and stays for 5 seconds. If snake can eat the booster apple, then the score is increased by 3. (:booster-apple)

8. Another feature called "life" is added. Initially 3 life has been given. A flower appears initially after eating 13 apples and after that eating random number of apples. It appears in random places in the canvas and stays for 2.5 seconds. And when the snake eats the flower, its life is increased randomly between 1 to 15 (inclusive). (:increase-life-food)

9. 4 walls are created in the canvas of the game. If the snake hits any of the walls it dies. There are 4 levels. In each level the arragement of the walls changes. After eating 15, 27 and 39 apples (respectively) in 0th, 1st and 2nd level the doors for going to next level 1st, 2nd and 3rd level appears. The door is indicated by 2 walls and a space between them near the edges of the canvas. If the snake hits the walls of the door, it dies. The door appears in different places in different levels.

## Features present in (:janbodnar/JavaScript-Snake-Game)
- The snake can move throughout the board and eat the food.
- It gets bigger by one cell when it eats the food.
- The snake gets killed by hitting itself.
- The snake gets killed by hitting the edges of the board/canvas.

- Head color is different to body 
- Snake can eat the apple
- Apple's position is dynamic and random and stays until the snake eats it.
- Score increases as snake eats the apple
- Snake's body doesn't increases as it eats the apple
- Snake can't move backward
- Snake position doesn't changes everytime the game started
- Snake doesn't get killed by hitting itself

- Head color is different to body
- Apple's position is static
- Snake cannot eat the apple
- Score doesn't increase (as snake can't eat the apple)
- Snake can move backward
- Snake's position changes everytime a game is started
- Snake should kill itself if it hits the edges of the board

### Feature modifications in the base GitHub Repo to make it "Initial Project":
- The snake won’t get bigger after eating the food
- Snake won’t be killed by hitting itself
