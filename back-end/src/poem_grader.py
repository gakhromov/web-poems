import re

import rusyllab
import russtress

import src.grading_rules as grading_rules


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
            rhymes[str(i+1)] = {'rhymes_with': str(i)}
        elif (i + 2 < len(syllab_list)) and (syllab_list[i] == syllab_list[i+2]):
            rhymes[str(i+2)] = {'rhymes_with': str(i)}
        elif (i + 3 < len(syllab_list)) and (syllab_list[i] == syllab_list[i+3]):
            rhymes[str(i+3)] = {'rhymes_with': str(i)}
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

    poem_info = get_rhymes_from_punc_poem(punctuationless_poem)

    accent = russtress.Accent()

    for i in range(len(punctuationless_poem)):
        if str(i) not in poem_info.keys():
            poem_info[str(i)] = dict()
        stress_pattern = get_stress_pattern(accent, punctuationless_poem[i])
        poem_info[str(i)]['stress_pattern'] = stress_pattern
        poem_info[str(i)]['stress_pattern_stats'] = check_stress_pattern(stress_pattern)

    return poem_info


def grade_poem(poem_info):
    points = dict()
    lines_that_are_in_rhyme = set()
    format_points = lambda x: f'+{x}' if x >= 0 else str(x)
    modulus = lambda x: -x if x < 0 else x

    for i in poem_info.keys():
        points[i] = {'points': 0, 'comments': []}

        # check rhymes
        if 'rhymes_with' in poem_info[i].keys():
            points[i]['points'] += grading_rules.RHYMES_WITH_ONE_LINE
            points[i]['comments'].append(
                format_points(grading_rules.RHYMES_WITH_ONE_LINE) + ': Рифмуется с одной из предыдущих строк'
            )
            lines_that_are_in_rhyme.add(int(i))
            lines_that_are_in_rhyme.add(int(poem_info[i]['rhymes_with']))
        
        # get most popular stress pattern
        most_popular_value = max(poem_info[i]['stress_pattern_stats'].values())
        most_popular_pattern_points = []
        for t in poem_info[i]['stress_pattern_stats'].keys():
            if poem_info[i]['stress_pattern_stats'][t] == most_popular_value:
                # get points from most popular pattern types
                most_popular_pattern_points.append(grading_rules.STRESS_PATTERN_POINTS[t])
        # give the max point
        max_p = max(most_popular_pattern_points)
        points[i]['points'] += max_p
        points[i]['comments'].append(
            format_points(max_p) + ': За стихотворный размер'
        )
        # check syllab count
        cur_syl_count = len(poem_info[i]['stress_pattern'])
        first_syl_count = len(poem_info['0']['stress_pattern'])
        diff = modulus(first_syl_count - cur_syl_count)
        if diff > 1:
            points[i]['points'] += grading_rules.COEFF_SYLLAB_COUNT_DIFFERS * diff
            points[i]['comments'].append(
                format_points(grading_rules.COEFF_SYLLAB_COUNT_DIFFERS * diff) + ': Количество слогов сильно отличается от первой строки'
            )
        
    # check lines that have no rhyming lines
    for i in poem_info.keys():
        if int(i) not in lines_that_are_in_rhyme:
            points[i]['points'] += grading_rules.LINE_THAT_DOES_NOT_RHYME
            points[i]['comments'].append(
                format_points(grading_rules.LINE_THAT_DOES_NOT_RHYME) + ': Не рифмуется ни с одной из строк'
            )

    points['poem'] = sum([points[i]['points'] for i in points.keys()])
    return points
