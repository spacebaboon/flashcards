import {List, Map} from 'immutable';

export function setWords(state, words) {
    return state.set('words', List(words));
}

export function connectWords(state, wordId1, wordId2) {

    return state.updateIn(['words', findIndexOfWord(state, wordId1), 'translations'], t => t.push(wordId2))
                .updateIn(['words', findIndexOfWord(state, wordId2), 'translations'], t => t.push(wordId1));
}

function findIndexOfWord(state, wordId) {
    return state.get('words').findIndex(word => word.get('id') === wordId);
}
