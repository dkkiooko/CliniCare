import pandas as pd
import datetime

df = pd.read_csv('visitsfin.csv')
print(df.dtypes)

df['created_at'] = df['created_at'].astype('datetime64')
print(df.dtypes)

df.to_csv('visits6.csv', index=False)