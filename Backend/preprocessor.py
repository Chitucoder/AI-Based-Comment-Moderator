
import re

def cleaning_string(text, stop_words):
    text = text.lower()
    text = re.sub(r"http\S+|www\S+","",text)
    text = re.sub(r"[^\w\s]","",text)
    text = re.sub(r"\d+","",text)
    text = text.strip()
    return " ".join([w for w in text.split() if w not in stop_words])


def evaluate_toxicity(toxic_prob, thresholds):
    labels = ['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']
    violations = [label for label in labels if toxic_prob[label] >= thresholds[label]]
    violation_scores = {label: toxic_prob[label] for label in violations}
    primary_label = max(violation_scores, key=violation_scores.get) if violations else None
    return {
        "is_flagged": len(violations) > 0,
        "show_warning": len(violations) > 0,
        "violations": violations,
        "violation_scores": violation_scores,
        "primary_label": primary_label,
        "recommendation": "mask" if len(violations) > 0 else "allow"
    }
    