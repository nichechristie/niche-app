#!/bin/bash

# Update "Niche Coin" to "Find Your Niche" throughout the project

echo "🔄 Updating branding from 'Niche Coin' to 'Find Your Niche'..."

# Function to replace in file
replace_in_file() {
    local file=$1
    if [[ -f "$file" ]]; then
        if grep -q "Niche Coin" "$file"; then
            sed -i.bak 's/Niche Coin/Find Your Niche/g' "$file"
            rm "${file}.bak"
            echo "✅ Updated: $file"
        fi
    fi
}

# Update all relevant files
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.md" -o -name "*.sol" \) \
    ! -path "./node_modules/*" \
    ! -path "./.next/*" \
    ! -path "./dist/*" \
    ! -path "./.git/*" | while read file; do
    replace_in_file "$file"
done

echo ""
echo "✨ Branding update complete!"
echo "📋 Run 'git diff' to review changes"
