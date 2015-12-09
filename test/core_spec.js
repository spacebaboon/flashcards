import {Map, List} from 'immutable';
import {expect} from 'chai';
import uuid from 'node-uuid';

import {setWords, addTranslation, getWords} from '../src/core';

const schmetterling = makeWord('der Schmetterling', 'German');
const butterfly = makeWord('butterfly', 'English');
const happy = makeWord('happy', 'English');
const lucky = makeWord('lucky', 'English');
const gluecklich = makeWord('glücklich', 'German');

function makeWord(text, language) {
    return Map({
        id: uuid.v4(),
        word: text,
        language: language,
        translations: List()
    })
}


describe('application logic', () => {

    describe('set words', () => {

        it('adds words to the state', () => {
            const state = Map();
            const words = List.of('mouse', 'tree', 'apple');
            const nextState = setWords(state, words);
            expect(nextState).to.equal(Map({
                words: List.of('mouse', 'tree', 'apple')
            }));
        });

        it('converts to immutable', () => {
            const state = Map();
            const words = ['hello', 'goodbye'];
            const nextState = setWords(state, words);
            expect(nextState).to.equal(Map({
                words: List.of('hello', 'goodbye')
            }));
        });
    });

    describe('connect words with translations', () => {

        it('connects an English and German word', () => {

            const words = List.of(butterfly, schmetterling);
            const state = setWords(Map(), words);
            const nextState = addTranslation(state, butterfly, schmetterling);

            expect(nextState).to.equal(Map({
                words: List.of(
                    Map({
                        id: butterfly.get('id'),
                        word: butterfly.get('word'),
                        language: butterfly.get('language'),
                        translations: List.of(schmetterling.get('id'))
                    }),
                    Map({
                        id: schmetterling.get('id'),
                        word: schmetterling.get('word'),
                        language: schmetterling.get('language'),
                        translations: List.of(butterfly.get('id'))
                    }))
            }));
        });

        it('adds another translation', () => {

            const words = List.of(happy, lucky, gluecklich);
            const state = setWords(Map(), words);
            const nextState = addTranslation(state, gluecklich, happy);
            const nextState2 = addTranslation(nextState, gluecklich, lucky);

            expect(nextState2).to.equal(Map({
                words: List.of(
                    Map({
                        id: happy.get('id'),
                        word: happy.get('word'),
                        language: happy.get('language'),
                        translations: List.of(gluecklich.get('id'))
                    }),
                    Map({
                        id: lucky.get('id'),
                        word: lucky.get('word'),
                        language: lucky.get('language'),
                        translations: List.of(gluecklich.get('id'))
                    }),
                    Map({
                        id: gluecklich.get('id'),
                        word: gluecklich.get('word'),
                        language: gluecklich.get('language'),
                        translations: List.of(happy.get('id'), lucky.get('id'))
                    })
                )
            }));

        });
    });

    describe('retrieve word lists', () => {

        it('retrieves words in a language with all translations', () => {
            const words = List.of(happy, lucky, gluecklich);
            const state = setWords(Map(), words);
            const nextState = addTranslation(state, gluecklich, happy);
            const nextState2 = addTranslation(nextState, gluecklich, lucky);

            const wordsByEnglish = getWords(nextState2, 'English');

            expect(wordsByEnglish).to.equal(Map({
                languages: List.of('English', 'German'),
                words: List.of(
                    Map({
                        id: happy.get('id'),
                        word: happy.get('word'),
                        language: happy.get('language'),
                        translations: List.of(Map({id: gluecklich.get('id'), word: gluecklich.get('word')}))
                    }),
                    Map({
                        id: lucky.get('id'),
                        word: lucky.get('word'),
                        language: lucky.get('language'),
                        translations: List.of(Map({id: gluecklich.get('id'), word: gluecklich.get('word')}))
                    })
                )})
            );

        });


    });

});