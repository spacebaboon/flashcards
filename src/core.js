import {List} from 'immutable';

export function setWords(state, words) {
    return state.set('words', List(words));
}

export function addTranslation(state, word1, word2) {

    const id1 = word1.get('id');
    const id2 = word2.get('id');

    return state.updateIn(['words', findIndexOfWord(state, id1), 'translations'], t => t.push(id2))
        .updateIn(['words', findIndexOfWord(state, id2), 'translations'], t => t.push(id1));
}

export function getWords(state, language) {
    return state;
}

function findIndexOfWord(state, wordId) {
    return state.get('words').findIndex(word => word.get('id') === wordId);
}
