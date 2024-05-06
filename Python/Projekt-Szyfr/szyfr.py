import random
import sys
import os

litery = {
    0: " ",
    1: "a", 2: "ą",
    3: "b", 4: "c", 5: "ć",
    6: "d",
    7: "e", 8: "ę",
    9: "f",
    10: "g",
    11: "h",
    12: "i",
    13: "j",
    14: "k",
    15: "l", 16: "ł",
    17: "m",
    18: "n", 19: "ń",
    20: "o", 21: "ó",
    22: "p",
    23: "r",
    24: "s", 25: "ś",
    26: "t",
    27: "u",
    28: "w",
    29: "y",
    30: "z", 31: "ź", 32: "ż",
}

slowa = []
with open("slownik.txt", "r", encoding='windows-1250') as file:
    slowa = [word.strip() for word in file.readlines()]

def deszyfruj(word):
    all_words =[]
    word1 =""
    for p in range(33):
        for q in range(33):
            word1 =""
            decrypted_word =""
            j =0
            all_words=[]
            for i in range(len(word)):
                word1 += word[i]
                decrypted_word = ""
                j +=1
                for letter in word1:  
                    key = find_key_by_value(letter)
                    decrypted_key = get_key_using_formula(key,p,q)
                
                    decrypted_word += litery[decrypted_key]

                if decrypted_word in slowa and j == len(word):
                    all_words.append(decrypted_word)
                    return(all_words)
                elif " " in decrypted_word[len(decrypted_word)-1] and decrypted_word[:-1] in slowa and len(decrypted_word) != len(word):
                    all_words.append(decrypted_word[:-1])
                    decrypted_word =""
                    word1=""    
        

def get_key_using_formula(value1, p, q):
    for key, value in litery.items():
        if (p * key + q) % len(litery) == value1:
            return key
    return 0
        
def find_key_by_value(litera):
    for key, value in litery.items():
        if value == litera:
            return key
    return None        
        
def get_value_by_key(klucz):
    for key, value in litery.items():
        if klucz == key:
            return value
    return None


zaszyfrowane_slowo = ""
    
os.chdir("input")    
with open(sys.argv[1],"r", encoding="utf-8") as f:
    zaszyfrowane_slowo = f.readline()
print("Zaszyfrowane slowo: ", zaszyfrowane_slowo)

odszyforwane_slowo = deszyfruj(zaszyfrowane_slowo)
print("Odszyfrowane slowa: ", odszyforwane_slowo)
os.chdir("..")
os.chdir("output")
with open(sys.argv[1],"a+") as file:
    for string in odszyforwane_slowo:
        file.write(string + " ")

    
    