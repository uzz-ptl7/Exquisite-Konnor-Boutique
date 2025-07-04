function recommendDress() {
    const weather = document.getElementById('weather').value.toLowerCase();
    const eventType = document.getElementById('eventType').value.toLowerCase();
    const style = document.getElementById('style').value.toLowerCase();
    const timeOfDay = document.getElementById('timeOfDay').value.toLowerCase();

    const recommendation = document.getElementById('recommendation');
    const outfit = document.getElementById('outfit');

    let outfitRecommendation = '';

    // Weather-Based Recommendations
    if (weather === 'hot') {
        outfitRecommendation += 'Light t-shirt, shorts, sunglasses, and sunscreen. ';
    } else if (weather === 'cold') {
        outfitRecommendation += 'Coat, scarf, gloves, and warm boots. ';
    } else if (weather === 'rainy') {
        outfitRecommendation += 'Raincoat, umbrella, waterproof shoes. ';
    }

    // Event Type Recommendations
    if (eventType === 'formal') {
        outfitRecommendation += 'Formal suit, tie, and dress shoes. ';
    } else if (eventType === 'casual') {
        outfitRecommendation += 'Casual shirt, jeans, and sneakers. ';
    } else if (eventType === 'party') {
        outfitRecommendation += 'Trendy dress, stylish shoes, and accessories. ';
    }

    // Style Preferences Recommendations
    if (style === 'classic') {
        outfitRecommendation += 'A timeless look with neutral tones and well-tailored pieces. ';
    } else if (style === 'trendy') {
        outfitRecommendation += 'Fashion-forward with the latest styles and bold patterns. ';
    } else if (style === 'sporty') {
        outfitRecommendation += 'Athleisure wear, sneakers, and comfortable layers. ';
    }

    // Time of Day Recommendations
    if (timeOfDay === 'day') {
        outfitRecommendation += 'Light, breathable fabrics for daytime activities. ';
    } else if (timeOfDay === 'night') {
        outfitRecommendation += 'Darker tones and layers for evening events. ';
    }

    if (!outfitRecommendation) {
        outfitRecommendation = 'Please fill in all fields for a complete recommendation.';
    }

    outfit.textContent = outfitRecommendation;
    recommendation.classList.remove('hidden');
}