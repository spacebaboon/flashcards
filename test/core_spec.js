import {Map, List} from 'immutable';
import {expect} from 'chai';
import uuid from 'node-uuid';

import {setWords, connectWords} from '../src/core';

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

    function makeWord(text,language){
        return Map({
            id: uuid.v4(),
            word: text,
            language: language,
            translations: List()
        })
    }

    describe('connect words with translations', () => {

        it('connects an English and German word', () => {
            const butterfly = makeWord('butterfly', 'English');
            const schmetterling = makeWord('der Schmetterling', 'German');
            const words = List.of(butterfly, schmetterling);
            const state = setWords(Map(), words);
            const nextState = connectWords(state, butterfly.get('id'), schmetterling.get('id'));

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
            const happy = makeWord('happy', 'English');
            const lucky = makeWord('lucky', 'English');
            const gluecklich = makeWord('glücklich', 'German');
            const words = List.of(happy, lucky, gluecklich);
            const state = setWords(Map(), words);
            const nextState = connectWords(state, gluecklich.get('id'), happy.get('id'));
            const nextState2 = connectWords(nextState, gluecklich.get('id'), lucky.get('id'));

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
});