# Minesweeper: Birthday Edition

The classic game of Minesweeper, reimagined with a cute birthday theme. In place of mines, the game board generates balloons. Be careful not to pop one!

## Motivation

When thinking about a browser game I could build with JavaScript, I was instantly drawn in when thinking about the logic behind Minesweeper. This was a fun way to challenge my knowledge of JavaScript and FlexBox while also being able to show off my CSS skills, as I already had a lot of previous experience with CSS. 

## Screenshots

![Balloon Bombs](https://i.imgur.com/LPXFAhZ.png)

![Empty squares and cupcake flags](https://i.imgur.com/vj7G8Al.png)

## User Stories & Wireframes

- When the user clicks on a square, the square will display either a number, an empty square, or a balloon.
- If the user clicks on a balloon, then then they lose the game.
- If the user clicks on an empty square, then all adjacent empty squares will be displayed, and all numbered squares adjacent to those will be displayed as well. 
- If the user clicks on a number, then only that number will be displayed and they must pick another square. 
- The numbered squares contain an integer representing the number of bombs in adjacent squares, which give hints about where the bombs are placed. 
- If the user can accurately deduce the location of a balloon, they can "flag" that square by right-clicking on it, which makes a cupcake icon appear on the square. That square cannot be revealed unless the user right-clicks again to remove the cupcake. This is a purely optional functionality that the player can use to protect squares that they know have a balloon in them and to accurately visualize where balloons are placed. 
- If the user reveals all empty and numbered squares without popping a balloon, they win the game.
- The stopwatch in the upper right corner helps a user keep track of how long it takes them to win a game so that they can try to beat their best time. 
- The number in the upper left corner indicates how many balloons are on the board. 
- The user can reset the board by clicking the green refresh button.

![Wireframe](https://i.imgur.com/WHX3F98.png)

## Technologies & Code Snippets

Technologies used in this project were:
- HTML & CSS
- FlexBox
- JavaScript

![Mutual Recursion: Click Event](https://i.imgur.com/WMhSQ94.png)

![Mutual Recursion: revealAdjEmpties()](https://i.imgur.com/T7r10lb.png)

## Credits

![StackOverflow: Simulate a click](https://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript)

This was really instrumental to me in implementing recursion in my program to make all adjacent empty squares appear when clicking an empty square.

## Future Development

I have many plans for future development of my game:
- Use a modal to display a win or lose message to the user, display their time if they win (and comparing it to their best time) and even give the user an ability to pick between themes and difficulty levels.
- Add party sounds when the user wins.
- Make balloons appear on the game board at various intervals after the user loses, each with their own pop sound and animation. 
- Create a function that clears the game board without refreshing the whole page to make the refresh feature less clunky, and also allowing users to keep track of best time. 
- Fix the timer. 
- Create rounded borders on the grid for a more polished look.
- Add more scenery to the background, perhaps some grass on the bottom and clouds so it looks like a picnic birthday party. 
- Create transition effects for alternative themes that make the squares turn into a cool animation when the user wins. 
- And more.