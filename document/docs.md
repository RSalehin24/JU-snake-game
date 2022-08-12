# Intro
> This repository contains implementation of a snake game. Different features has been implemented in different branches. For workshop the student will be given "first-step" to implement different features. Students will implement the "Initial Mode" and "Challenges" throughout their workshop session. Branch name, in which a specific feature has been implemented, is given by ":branch_name" inside first bracket with them at their right side. In "Challenges" each challenge's index is its difficulty level. Every feature is developed on "initial-mode" branch except for "snake-life" and "increase-life-food".

## First Step (:first-step)
- Head color is same as body
- Apple's position is static
- Snake cannot eat the apple
- Snake doesn't increase in length (as it can't eat the apple)
- Score doesn't increase (as snake can't eat the apple)
- Snake can move backward
- Snake's position changes everytime a game is started
- Snake dies if it hits the edges of the board

## Initial Mode (:initial-mode)
> The change of features and new features in initial-mode compare to first-step

- Head color is different to body 
- Snake can eat the apple
- Apple's position is dynamic and random and stays until the snake eats it
- Score increases as snake eats the apple
- Snake's body doesn't increase in length even if it eats the apple
- Snake can't move backward
- Snake position doesn't change everytime the game started
- Snake doesn't get killed by hitting itself

## Challenges
1. Snake increases in length by one unit everytime it eats one apple. (:snake-size-increase)
 
2. Snake moves through the edges to their opposite edge in a circular way. (:cirular-way)

3. Snake gets killed by hitting itself. (:killed-by-hitting-itself)

4. If the snake hits its body, then the remaining part of the body disappears from the hitting spot but the snake doesn't die. (:snake-body-disappear)

5. There is a reset button above the top-right corner of canvas which resets the game. (:reset)

6. The speed of snake increases with the score. (:increase-speed)

7. Another apple called 'booster apple' is added to the game. Booster apple appears in random places after eating every 5 apples and stays for 5 seconds. If snake can eat the booster apple, then the score is increased by 3 points. (:booster-apple)

8. Another feature called "life" is added. Initially 3 lifes have been given. A flower appears initially after eating 13 apples and after that, eating random number of apples. It appears in random places in the canvas and stays for 2.5 seconds. And when the snake eats the flower, its life is increased randomly between 1 to 15 (inclusive). (:increase-life-food)

9. 4 walls are created in the canvas of the game. If the snake hits any of the walls it dies. There are 4 levels. In each level the arragement of the walls changes. After eating 15, 27 and 39 apples (respectively) in 0th, 1st and 2nd level the doors for going to next level 1st, 2nd and 3rd level appears. The door is indicated by 2 walls and a space between them near the edges of the canvas. If the snake hits the walls of the door, it dies. The door appears in different places in different levels.

<br>

## Compare to (:janbodnar/JavaScript-Snake-Game)

### Features present in (:JavaScript-Snake-Game)
- Head color is different to body 
- Snake can eat the apple
- Apple's position is dynamic and random and stays until the snake eats it.
- Score increases as snake eats the apple
- Snake's body increases in length as it eats the apple
- Snake can't move backward
- Snake position changes everytime the game started
- Snake gets killed by hitting itself
- Snake dies if it hits the edges of the board

### Modification in Initial Mode
- The snake doesn't increase in length
- Snake does not get killed by hitting itself

### Modification in First Step
- Head color is same as body
- Apple's position is static
- Snake cannot eat the apple
- Snake doesn't increase in length
- Score doesn't increase 
- Snake can move backward
- Snake's position changes everytime a game is started
