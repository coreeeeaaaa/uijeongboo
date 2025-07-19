#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw
import itertools
import math

def create_rounded_rectangle_mask(size, radius_ratio=0.2):
    """Create a mask for rounded rectangle"""
    img = Image.new('L', (size, size), 0)
    draw = ImageDraw.Draw(img)
    
    radius = int(size * radius_ratio)
    
    # Draw rounded rectangle
    draw.rectangle([radius, 0, size-radius, size], fill=255)
    draw.rectangle([0, radius, size, size-radius], fill=255)
    
    # Draw corners
    draw.pieslice([0, 0, 2*radius, 2*radius], 180, 270, fill=255)
    draw.pieslice([size-2*radius, 0, size, 2*radius], 270, 360, fill=255)
    draw.pieslice([0, size-2*radius, 2*radius, size], 90, 180, fill=255)
    draw.pieslice([size-2*radius, size-2*radius, size, size], 0, 90, fill=255)
    
    return img

def create_macos_quadrant_icon(quadrants, size=1024):
    """
    Create a macOS-style icon with specified quadrants filled
    quadrants: list of quadrant numbers (1,2,3,4) to fill
    1=top-right, 2=top-left, 3=bottom-left, 4=bottom-right
    """
    # Colors
    bg_color = (0, 0, 0)  # Black background
    lime_color = (50, 205, 50)  # Lime green
    
    # Create base image with black background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    
    # Create rounded rectangle background
    mask = create_rounded_rectangle_mask(size)
    background = Image.new('RGBA', (size, size), bg_color + (255,))
    img.paste(background, mask=mask)
    
    # Draw on a temporary image for the quadrants
    temp = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(temp)
    
    # Calculate circle parameters with padding for macOS style
    padding = size * 0.15  # 15% padding for macOS icon style
    center = size // 2
    radius = (size // 2) - int(padding)
    
    # Define quadrant angles
    quadrant_angles = {
        1: (0, 90),      # top-right
        2: (90, 180),    # top-left
        3: (180, 270),   # bottom-left
        4: (270, 360)    # bottom-right
    }
    
    # Create bounding box for the circle
    x0 = center - radius
    y0 = center - radius
    x1 = center + radius
    y1 = center + radius
    bbox = [x0, y0, x1, y1]
    
    # Draw filled quadrants
    for q in quadrants:
        if q in quadrant_angles:
            start_angle, end_angle = quadrant_angles[q]
            draw.pieslice(bbox, start_angle, end_angle, fill=lime_color + (255,))
    
    # Apply the quadrants to the main image with the mask
    img.paste(temp, (0, 0), temp)
    
    # Apply final mask to ensure rounded corners
    final = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    final.paste(img, mask=mask)
    
    return final

def generate_all_combinations():
    """Generate all possible non-empty combinations of quadrants"""
    quadrants = [1, 2, 3, 4]
    combinations = []
    
    # Generate all possible combinations (1-4 quadrants)
    for r in range(1, 5):
        for combo in itertools.combinations(quadrants, r):
            combinations.append(list(combo))
    
    return combinations

def create_macos_icon_variants():
    """Create all 15 possible quadrant combinations in macOS style"""
    combinations = generate_all_combinations()
    
    # Create output directories
    os.makedirs('macos_icons', exist_ok=True)
    os.makedirs('macos_icons/variants', exist_ok=True)
    os.makedirs('macos_icons/iconsets', exist_ok=True)
    
    # macOS icon sizes
    icon_sizes = [
        (16, "16x16"),
        (32, "16x16@2x"),
        (32, "32x32"),
        (64, "32x32@2x"),
        (128, "128x128"),
        (256, "128x128@2x"),
        (256, "256x256"),
        (512, "256x256@2x"),
        (512, "512x512"),
        (1024, "512x512@2x")
    ]
    
    for i, combo in enumerate(combinations, 1):
        combo_str = ''.join(map(str, sorted(combo)))
        name = f"saaaaha_q{combo_str}"
        
        print(f"Generating macOS variant {i}/15: {name} (quadrants: {combo})")
        
        # Create iconset directory
        iconset_dir = f'macos_icons/iconsets/{name}.iconset'
        os.makedirs(iconset_dir, exist_ok=True)
        
        # Generate main variant at full size
        icon_1024 = create_macos_quadrant_icon(combo, 1024)
        icon_1024.save(f'macos_icons/variants/{name}.png')
        
        # Generate all required sizes for iconset
        for size, filename in icon_sizes:
            icon = create_macos_quadrant_icon(combo, size)
            icon.save(f'{iconset_dir}/icon_{filename}.png')
        
        # Create .icns file using iconutil
        os.system(f'iconutil -c icns {iconset_dir} -o macos_icons/{name}.icns 2>/dev/null')

def create_demo_sheet():
    """Create a demo sheet showing all macOS style variants"""
    combinations = generate_all_combinations()
    
    # Create a large image to show all variants
    grid_size = 4  # 4x4 grid
    variant_size = 256
    margin = 20
    total_size = grid_size * (variant_size + margin) - margin
    
    demo = Image.new('RGB', (total_size, total_size), (30, 30, 30))  # Dark gray background
    
    for i, combo in enumerate(combinations):
        row = i // grid_size
        col = i % grid_size
        
        x = col * (variant_size + margin)
        y = row * (variant_size + margin)
        
        icon = create_macos_quadrant_icon(combo, variant_size)
        demo.paste(icon, (x, y), icon)
    
    demo.save('macos_icons/saaaaha_all_variants_demo.png')
    print("Demo sheet saved as macos_icons/saaaaha_all_variants_demo.png")

if __name__ == "__main__":
    print("Creating SAAAAHA macOS-style quadrant icon variants...")
    print("Total variants: 15 (excluding empty circle)")
    print("Colors: Lime green on black background with rounded corners")
    
    create_macos_icon_variants()
    create_demo_sheet()
    
    print("\nmacOS icon generation complete!")
    print("- Individual variants: macos_icons/variants/")
    print("- Icon sets: macos_icons/iconsets/")
    print("- ICNS files: macos_icons/*.icns")
    print("- Demo sheet: macos_icons/saaaaha_all_variants_demo.png")