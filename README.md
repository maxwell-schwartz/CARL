# CARL

CARL (Computerized Attentive Responding Listener) responds to user input, prompting further responses.

Originally written in Python. Started as a class assignment to write a program like ELIZA (https://en.wikipedia.org/wiki/ELIZA).

Tricky parts that are mostly working:
* Should "you" change to "I" or "me"? ("You talk a lot" -> "I talk a lot" VS "I like you" -> "You like me")
* Should "are" and "were" change to "am" and "was" or stay as is? ("You are" -> "I am" VS "They are" -> "They are")

In development:
* "Yes" or "no" input from user. These should get their own type of response.
* Greetings from user. If the user says "hello," this should not be in CARL's response.
* Questions from user.

To do/solve:
* Does "that" act as a pronoun or is it the beginning of a clause? Also, clause issues in general.
* Add a simple "face" that changes based on the conversation.
