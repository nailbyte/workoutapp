#!/bin/bash

COLLECTION_NAME="workoutTemplates"
PROJECT_ID="workout-app-400912"

# Get Document IDs where programName is null
DOCUMENT_IDS=$(gcloud firestore documents list projects/$PROJECT_ID/databases/'(default)'/documents/$COLLECTION_NAME --filter="fields.programName=nullValue={}" --format="value(name)")

# Loop over each document ID and delete
for DOC_PATH in $DOCUMENT_IDS; do
    DOC_ID=$(basename $DOC_PATH)
    echo "Deleting document with ID: $DOC_ID"
    gcloud firestore documents delete projects/$PROJECT_ID/databases/'(default)'/documents/$COLLECTION_NAME/$DOC_ID
done

echo "Deletion process completed!"
