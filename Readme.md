# Flashcards

App for revising foreign language vocabulary. Written in React and Redux, with ES6 and Webpack.

## data structure:

words: [{word_id, word, language, translations: [{word_id, attempts, successes}]

## pages
list words
add / edit word
flashcards

## functionality

### list words
select language to show on left
list all words with translation(s) on right
columns: language1, language2, attempts, success %, date added/edited
click column headers to sort


### manage vocab - add/edit/delete word
add word	- detect and show duplicate on both
edit word	/
delete word

### add word
- choose first language
- enter word, use autocomplete to search for existing duplicates
- click / hit enter to persist word.
- move to add translation.
- use autocomplete to search for existing translations. show existing translation with matches. 
- if existing word selected, persist connection between the two.
- if new word added, persist new word and add connection between the two.
- save / update words. stay in edit mode to allow more translations to be added.

### edit word
- display primary language word on left
- display translation(s) on right
- allow add, edit, delete of each word on right



## data functions

setWords
addWord
editWord
removeWord
connectWords (addTranslation)
disconnectWords (removeTranslation)
listWords


## actions

ADD_WORD(word)
EDIT_WORD(word)
REMOVE_WORD(word)
ADD_TRANSLATION(word, word)
REMOVE_TRANSLATION(word, word)


## components

list page:
word list
word list entry

edit page:
word

flashcards page:
word with translation (flashcard?)
word


