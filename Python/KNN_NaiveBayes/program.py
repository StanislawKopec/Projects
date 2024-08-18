import pandas as pd
import numpy as np
import random as rn

data = pd.read_csv("travel.csv")

data.drop(data.columns[0], axis=1)
data = data.dropna()

def yes_no_to_binary(val):
    if val == 'Yes':
        return 1
    elif val == 'No':
        return 0
    else:
        return None
        
def transform_unique_strings(data, column_name):
    unique_strings = data[column_name].unique()
    mapping = {string: index + 1 for index, string in enumerate(unique_strings)}
    data[column_name] = data[column_name].map(mapping)
    return data

data = transform_unique_strings(data, 'Employment Type')
data['GraduateOrNot'] = data['GraduateOrNot'].apply(yes_no_to_binary)
data['FrequentFlyer'] = data['FrequentFlyer'].apply(yes_no_to_binary)
data['EverTravelledAbroad'] = data['EverTravelledAbroad'].apply(yes_no_to_binary)

class DataProcessing:
    @staticmethod
    def shuffle(dataset):
        for i in range(len(dataset)-1, 0, -1):
            j = rn.randint(0,i-1)
            dataset.iloc[i], dataset.iloc[j] = dataset.iloc[j], dataset.iloc[i]
    @staticmethod
    def NormalizeData(dataset):
        values = dataset.select_dtypes(exclude='object')
        columnNames = values.columns.tolist()
        for column in columnNames:
            data = dataset[column]
            min_val = data.min()
            max_val = data.max()
            dataset[column] = (data - min_val) / (max_val - min_val)
    @staticmethod
    def split(dataset, k):
        return dataset[:int(len(dataset)*k)], dataset[int(len(dataset)*k):]

DataProcessing.shuffle(data)
trainingSet, validatingSet = DataProcessing.split(data, 0.7)

DataProcessing.NormalizeData(data)
trainingSetNormalized, validatingSetNormalized = DataProcessing.split(data, 0.7)
print(data.head())

class NaiveBayes:
    @staticmethod
    def mean(atr):
        return sum(atr) / len(atr)
    
    @staticmethod
    def stdev(atr, mean):
        stdev = 0
        for i in atr:
            stdev += (i - mean) ** 2
        stdev = stdev / len(atr)
        stdev = np.sqrt(stdev)
        return stdev
    
    @staticmethod
    def triangular(x, mean, std):
        if x < mean - np.sqrt(6) * std or x > mean + np.sqrt(6) * std:
            return 0
        elif mean - np.sqrt(6) * std <= x <= mean:
            return (x - mean) / (6 * std ** 2) + 1 / (np.sqrt(6) * std)
        else:  # mean <= x <= mean + np.sqrt(6) * std
            return -(x - mean) / (6 * std ** 2) + 1 / (np.sqrt(6) * std)

    @staticmethod
    def calculate_class_probability(tmp, sample):
        prob = 1
        for columnName in tmp.columns.tolist()[:-1]:
            data = tmp[columnName]
            mu = NaiveBayes.mean(data)
            sigma = NaiveBayes.stdev(data, mu)
            prob *= NaiveBayes.triangular(sample[columnName], mu, sigma)
        return prob

    @staticmethod
    def classify(dataset, sample):
        probability = []
        classNames = dataset['TravelInsurance'].unique().tolist()
        for className in classNames:
            tmp = dataset[dataset['TravelInsurance'] == className]
            prob = NaiveBayes.calculate_class_probability(tmp, sample)
            prob *= len(tmp) / len(dataset)
            probability.append(prob)
        maxProb = max(probability)
        return classNames[probability.index(maxProb)]

counter = 0
for x in range(len(validatingSetNormalized)):
    result = NaiveBayes.classify(trainingSetNormalized, validatingSetNormalized.iloc[x])
    actual_class = validatingSetNormalized.iloc[x]['TravelInsurance']
    if result == actual_class:
        counter += 1
accuracy = (counter/len(validatingSetNormalized))*100
print("Dokładność dla danych znormalizowanych wynosi", accuracy, "%.")

counter2 = 0
for x in range(len(validatingSet)):
    result2 = NaiveBayes.classify(trainingSet, validatingSet.iloc[x])
    if result2 == validatingSet.iloc[x]['TravelInsurance']:
        counter2 += 1
accuracy2 = (counter2/len(validatingSet))*100
print("Dokładność dla danych nieznormalizowanych wynosi", accuracy2, "%.")