### Data Visualization Project 3 – Team 1
Here is the deployment link https://jessicaborbon.github.io/Zillow-Market-Analysis-Data-Visualization---Project-3/

### Renee Perez, Jessica Borbon, Jorge Benavente

## Zillow Market Analysis Visualization

In this Zillow Market Analysis Visualization, we created an interactive map to display changes in the market value of single-family homes across three different periods in Phoenix, AZ. Our focus was on illustrating the differences in property values before and after the Great Recession, during the Recovery Period, and throughout COVID-19.

The interactive map features a drop-down menu to select property values before and after the Great Recession, during the Recovery Period, and throughout COVID-19. It displays color-coded markers that change based on the selected year and price percentage. Clicking on each marker reveals a pop-up with details about housing prices, the average market percentage, the value for single-family homes, and the average market price for single-family homes. The color codes are as follows:

Pink: less than 50%
Green: 50% to less than 100%
Yellow: 100% to less than 200%
Blue: greater than 200% 
![alt text](<screenshot/Screenshot 2024-07-25 at 8.42.04 PM.png>)

![alt text](<screenshot/Screenshot 2024-07-25 at 8.42.56 PM.png>)

![alt text](<screenshot/Screenshot 2024-07-25 at 8.43.19 PM.png>)
### Data process
The data processing involved several steps to ensure accuracy and usability for the visualization. Initially, the data was extracted from various sources and imported into a PostgreSQL database. Within Postgres, the data underwent a series of transformations to clean and structure it appropriately. This included filtering out irrelevant entries, normalizing data formats, and calculating necessary metrics. After the transformation phase, the processed data was exported from Postgres into a new CSV file. This CSV file served as the foundation for creating the visualization, allowing for an efficient and streamlined process to showcase the market analysis effectively.

### All corresponding files can be found in the main branch of the GitHub page. Here are the files to reference for the final work:
README | 
index.html |
logic.js |
style.css

You will see below information on our data sources:
### Zillow Market Analysis Dataset, NASDAQ - https://data.nasdaq.com/databases/ZILLOW

US Zip Code Dataset, SimpleMaps - https://simplemaps.com/data/us-zips

 Ethical Considerations: Although our datasets contain no personal or identifying information for individuals, we were sure to cite the source attribution in the code for the datasets used and ensured we did not share any API keys with others. We stated the purpose for using the dataset was educational and will not be used for any other purpose.
