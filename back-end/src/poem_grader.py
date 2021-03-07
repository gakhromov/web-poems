import re

import rusyllab
import russtress


ALPHABET = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'
STRONG_CONSONANTS = 'бвгджзклмнпрстфхцчшщъь'
APPROX_VOWELS = 'аеёийоуыэюя'


def get_last_syllab_from_line(line):
    last_word = line.split()[-1]
    last_syl = rusyllab.split_word(last_word)[-1]
    # remove consonants at the start if the syllable ends with a consonant
    if last_syl[-1] in STRONG_CONSONANTS:
        while last_syl[0] not in APPROX_VOWELS:
            last_syl = last_syl[1:]
    return last_syl


def get_rhymes_from_punc_poem(puncless_poem):
    syllab_list = [get_last_syllab_from_line(line) for line in puncless_poem]
    rhymes = {}
    i = 0
    while i + 1 < len(syllab_list):
        if syllab_list[i] == syllab_list[i+1]:
            rhymes[i+1] = {'rhymes_with': i}
        elif (i + 2 < len(syllab_list)) and (syllab_list[i] == syllab_list[i+2]):
            rhymes[i+2] = {'rhymes_with': i}
        elif (i + 3 < len(syllab_list)) and (syllab_list[i] == syllab_list[i+3]):
            rhymes[i+3] = {'rhymes_with': i}
        i = i + 1
    return rhymes


def format_accent(line):
    lst = list(line)
    i = 0
    while i < len(lst):
        if lst[i] == "'":
            lst[i-1] = lst[i-1].upper()
            del lst[i]
        else:
            i = i + 1
    return ''.join(lst)


# line should be lowered !!
def get_stress_pattern(accent: russtress.Accent, line):
    acc_line = accent.put_stress(line)
    acc_line = format_accent(acc_line)
    syllables = rusyllab.split_words(acc_line.split())
    syllables = list(filter(lambda x: x != ' ', syllables))

    pattern = []
    for syllab in syllables:
        if syllab == syllab.lower():  # there is no accent in the syllab
            pattern.append('_')
        else:
            pattern.append('/')
    return ''.join(pattern)


def check_stress_pattern(line_stress_pattern):
    return {
        'хорей': line_stress_pattern.count('/_'),
        'ямб': line_stress_pattern.count('_/'),

        'дактиль': line_stress_pattern.count('/__'),
        'амфибрахий': line_stress_pattern.count('_/_'),
        'анапест': line_stress_pattern.count('__/'),
    }


def get_poem_info(poem):
    poem = poem.split('\n')
    punctuationless_poem = [re.sub(r'[^\w\s]', '', pm.lower()) for pm in poem]
    print(punctuationless_poem)

    lines_info = get_rhymes_from_punc_poem(punctuationless_poem)

    accent = russtress.Accent()

    for i in range(len(punctuationless_poem)):
        if i not in lines_info.keys():
            lines_info[i] = dict()
        stress_pattern = get_stress_pattern(accent, punctuationless_poem[i])
        lines_info[i]['stress_pattern'] = check_stress_pattern(stress_pattern)

    return lines_info
