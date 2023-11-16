import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from docx import Document
from pdfminer.high_level import extract_text as extract_text_pdf
import spacy
import pandas as pd
import re
from datetime import datetime, timedelta
import locale
from unidecode import unidecode


# Définition de la localisation française
locale.setlocale(locale.LC_TIME, 'fr_FR.UTF-8')


cv_folder_path = r'C:\Users\guedrouz.ESH\Downloads\web_dev\dev_samrtCV\back\uploads\cv' # Example path to the folder containing CVs
job_offer_path = r'C:\Users\guedrouz.ESH\Downloads\web_dev\dev_samrtCV\back\uploads\jobs\Data_Analyst.docx'

def traitement(offre_path):
    def extract_text_from_pdf(pdf_path):
        return extract_text_pdf(pdf_path)

    def preprocess_text(text):
        # Implement your text preprocessing here (lowercasing, punctuation removal, etc.)
        return text

    for cv_filename in os.listdir(cv_folder_path):
        if cv_filename.endswith('.pdf'):
            cv_path = os.path.join(cv_folder_path, cv_filename)
            cv_text = extract_text_from_pdf(cv_path)
        else:
            continue

        cv_text = preprocess_text(cv_text)

    def extract_text_from_docx(docx_path):
        doc = Document(docx_path)
        return ' '.join([p.text for p in doc.paragraphs])
    
    job_offer_text = extract_text_from_docx(job_offer_path)
    job_offer_text = preprocess_text(job_offer_text)
    offre_list = []
    competences = [
    # Compétences en Data Science
    'python',
    'r',
    'julia',
    'scala',
    'pandas',
    'numpy',
    'scikit-learn',
    'tensorflow',
    'pytorch',
    'keras',
    'matplotlib',
    'seaborn',
    'plotly',
    'dask',
    'spark',
    'sql',
    'mongodb',
    'cassandra',
    'couchdb',
    'bigquery',
    'aws redshift',
    'snowflake',
    'hadoop',
    'apache spark',
    'apache flink',
    'data cleaning',
    'data wrangling',
    'feature engineering',
    'regression linéaire',
    'regression logistique',
    'tests d\'hypothèses',
    'analyse de variance',
    'analyse de séries temporelles',
    'classification',
    'régression',
    'clustering',
    'random forest',
    'gradient boosting',
    'svm',
    'réseaux de neurones',
    'réseaux de neurones convolutifs',
    'réseaux de neurones récurrents',
    'autoencodeurs',
    'transformers',
    'tokenization',
    'word embeddings',
    'modèles de langage',
    'bert',
    'gpt',
    'ner',
    'sentiment analysis',
    'tableau',
    'power bi',
    'flask',
    'fastapi',
    'docker',
    'kubernetes',
    'aws sagemaker',
    'tensorflow serving',
    'création de nouvelles caractéristiques',
    'sélection de caractéristiques',
    'traitement des valeurs manquantes',
    'normalisation',
    'standardisation',
    'méthodologies agiles',
    'git',
    'jira',
    'trello',
    'communication des résultats',
    'rédaction de rapports techniques',
    'présentations',
    'compréhension des besoins métier',
    "statistique",
    "machine learning",
    "deep learning",
    "data",
    "capacité d'analyse",
    "force de proposition",
    "bases de données",
    "mysql",
    "mssql",
    "azure",
    "aws",
    "gcp",
    "data science",
    "marketing",
    
    
    # Compétences en Marketing liées à la Data
    "marketing"
    'analyse de marché',
    'segmentation de marché',
    'marketing automation',
    'analyse du comportement des utilisateurs',
    'analytique web',
    'optimisation des conversions',
    'a/b testing',
    'seo',
    'sea',
    'crm',
    'gestion de campagnes publicitaires',
    'analyse des performances marketing',
    'analyse de la concurrence',
    'intelligence concurrentielle',
    'analyse des tendances du marché',
    'stratégie de contenu',
    'analyse de sentiment',
    
    # Compétences en Développement
    'java',
    'javascript',
    'html',
    'css',
    'node.js',
    'react',
    'angular',
    'vue.js',
    'express.js',
    'django',
    'flask',
    'spring',
    'hibernate',
    'restful api',
    'graphql',
    
    # Compétences Talend
    'talend',
    'etl',
    'talend open studio',
    'talend data integration',
    'talend big data',
    'talend administration',
    
    # Compétences Snowflake
    'snowflake',
    'snowflake sql',
    'snowflake data warehousing',
    'snowflake administration',
    ]
    def extraire_competences(texte, competences):
        competences_trouvees = set()

        for competence in competences:
            # Utilisation d'une expression régulière pour rechercher la compétence dans le texte
            regex = re.compile(r'\b' + re.escape(competence) + r'\b', re.IGNORECASE)
            if regex.search(texte):
                competences_trouvees.add(competence)

        return competences_trouvees

# Appel de la fonction avec le texte et la liste des compétences
    competences_trouvees = extraire_competences(job_offer_text, competences)
    for comp in list(competences_trouvees):
        offre_comp ={"compétence":comp}
        offre_list.append(offre_comp)
    return print(offre_list)
    
traitement(r'C:\Users\guedrouz.ESH\Downloads\web_dev\dev_samrtCV\back\uploads\jobs\Data_Analyst.docx')





