import pandas as pd
  
# read_csv function which is used to read the required CSV file
data = pd.read_csv('visits3.csv')
  
# display
print("Original 'visits.csv' CSV Data: \n")
print(data)
  
# pop function which is used in removing or deleting columns from the CSV files
data.pop('Unnamed: 0')
  
# display
print("\nCSV Data after deleting the column 'year':\n")
print(data)
data.to_csv('visitsfin.csv', index=False)
