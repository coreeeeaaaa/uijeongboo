#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw
import itertools
import math

# Load design specs
LIME_COLOR = (50, 205, 50)  # #32CD32
BG_COLOR = (0, 0, 0)  # Black
PADDING_RATIO = 0.15  # 15% padding

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

def create_icon_with_slices(slices, total_slices, size=1024, icon_type="eighth"):
    """
    Create an icon with specified slices filled
    slices: list of slice numbers to fill (1-based)
    total_slices: total number of slices (1, 2, 4, or 8)
    """
    # Create base image with transparent background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    
    # Create rounded rectangle background
    mask = create_rounded_rectangle_mask(size)
    background = Image.new('RGBA', (size, size), BG_COLOR + (255,))
    img.paste(background, mask=mask)
    
    # Draw on a temporary image for the slices
    temp = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(temp)
    
    # Calculate circle parameters
    padding = size * PADDING_RATIO
    center = size // 2
    radius = (size // 2) - int(padding)
    
    # Create bounding box for the circle
    x0 = center - radius
    y0 = center - radius
    x1 = center + radius
    y1 = center + radius
    bbox = [x0, y0, x1, y1]
    
    # Calculate angle per slice
    angle_per_slice = 360 / total_slices
    
    # Draw filled slices
    if total_slices == 1 and slices:  # Full circle
        draw.ellipse(bbox, fill=LIME_COLOR + (255,))
    else:
        for slice_num in slices:
            # Calculate start and end angles
            # Slice 1 starts at top (270°)
            start_angle = 270 + (slice_num - 1) * angle_per_slice
            end_angle = start_angle + angle_per_slice
            
            # Normalize angles to 0-360 range
            start_angle = start_angle % 360
            end_angle = end_angle % 360
            
            # Handle wrap-around case
            if end_angle < start_angle:
                # Draw in two parts
                draw.pieslice(bbox, start_angle, 360, fill=LIME_COLOR + (255,))
                draw.pieslice(bbox, 0, end_angle, fill=LIME_COLOR + (255,))
            else:
                draw.pieslice(bbox, start_angle, end_angle, fill=LIME_COLOR + (255,))
    
    # Apply the slices to the main image with the mask
    img.paste(temp, (0, 0), temp)
    
    # Apply final mask to ensure rounded corners
    final = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    final.paste(img, mask=mask)
    
    return final

def generate_slice_combinations(total_slices):
    """Generate all non-empty combinations for given number of slices"""
    slices = list(range(1, total_slices + 1))
    combinations = []
    
    # Generate all possible combinations
    for r in range(1, total_slices + 1):
        for combo in itertools.combinations(slices, r):
            combinations.append(list(combo))
    
    return combinations

def create_all_pizza_icons():
    """Create all pizza-style icon variations"""
    
    # Create main output directory
    os.makedirs('pizza_icons', exist_ok=True)
    
    # Icon configurations
    configs = [
        ("full_circle", 1),
        ("half_circle", 2),
        ("quarter_circle", 4),
        ("eighth_circle", 8)
    ]
    
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
    
    for folder_name, total_slices in configs:
        print(f"\nGenerating {folder_name} variations...")
        
        # Create directories
        base_dir = f'pizza_icons/{folder_name}'
        os.makedirs(f'{base_dir}/variants', exist_ok=True)
        os.makedirs(f'{base_dir}/iconsets', exist_ok=True)
        
        # Get all combinations
        combinations = generate_slice_combinations(total_slices)
        
        # Special handling for 8-slice (only missing slices variations)
        if total_slices == 8:
            # Create specific variations: 1 missing, 2 missing, ..., 7 missing
            # We'll create one representative example for each missing count
            combinations = [
                [2, 3, 4, 5, 6, 7, 8],     # 1 missing (slice 1)
                [3, 4, 5, 6, 7, 8],        # 2 missing (slices 1-2)
                [4, 5, 6, 7, 8],           # 3 missing (slices 1-3)
                [5, 6, 7, 8],              # 4 missing (slices 1-4)
                [6, 7, 8],                 # 5 missing (slices 1-5)
                [7, 8],                    # 6 missing (slices 1-6)
                [8],                       # 7 missing (slices 1-7)
            ]
        
        for i, combo in enumerate(combinations, 1):
            # Create name based on what's present or missing
            if total_slices == 8:
                # For 8-slice, name by how many slices are missing
                missing_count = 8 - len(combo)
                name = f"saaaaha_8slice_missing{missing_count}"
            else:
                # For others, use slice numbers
                combo_str = ''.join(map(str, sorted(combo)))
                if total_slices == 1:
                    name = "saaaaha_full"
                elif total_slices == 2:
                    name = f"saaaaha_half_s{combo_str}"
                elif total_slices == 4:
                    name = f"saaaaha_quarter_s{combo_str}"
            
            print(f"  Variant {i}/{len(combinations)}: {name}")
            
            # Create iconset directory
            iconset_dir = f'{base_dir}/iconsets/{name}.iconset'
            os.makedirs(iconset_dir, exist_ok=True)
            
            # Generate main variant at full size
            icon_1024 = create_icon_with_slices(combo, total_slices, 1024)
            icon_1024.save(f'{base_dir}/variants/{name}.png')
            
            # Generate all required sizes for iconset
            for size, filename in icon_sizes:
                icon = create_icon_with_slices(combo, total_slices, size)
                icon.save(f'{iconset_dir}/icon_{filename}.png')
            
            # Create .icns file using iconutil
            os.system(f'iconutil -c icns {iconset_dir} -o {base_dir}/{name}.icns 2>/dev/null')

def create_demo_sheets():
    """Create demo sheets for each icon type"""
    
    configs = [
        ("full_circle", 1, 1),  # rows needed
        ("half_circle", 2, 1),
        ("quarter_circle", 4, 4),
        ("eighth_circle", 8, 8)
    ]
    
    for folder_name, total_slices, grid_rows in configs:
        print(f"\nCreating demo sheet for {folder_name}...")
        
        combinations = generate_slice_combinations(total_slices)
        
        # Special handling for 8-slice
        if total_slices == 8:
            # Use the same 7 variations as above
            combinations = [
                [2, 3, 4, 5, 6, 7, 8],     # 1 missing
                [3, 4, 5, 6, 7, 8],        # 2 missing
                [4, 5, 6, 7, 8],           # 3 missing
                [5, 6, 7, 8],              # 4 missing
                [6, 7, 8],                 # 5 missing
                [7, 8],                    # 6 missing
                [8],                       # 7 missing
            ]
        
        # Calculate grid
        grid_cols = 4
        variant_size = 200
        margin = 20
        
        # Calculate total size
        total_width = grid_cols * (variant_size + margin) - margin
        total_height = grid_rows * (variant_size + margin) - margin
        
        demo = Image.new('RGB', (total_width, total_height), (30, 30, 30))
        
        for i, combo in enumerate(combinations):
            row = i // grid_cols
            col = i % grid_cols
            
            x = col * (variant_size + margin)
            y = row * (variant_size + margin)
            
            icon = create_icon_with_slices(combo, total_slices, variant_size)
            demo.paste(icon, (x, y), icon)
        
        demo.save(f'pizza_icons/{folder_name}_demo.png')

if __name__ == "__main__":
    print("Creating SAAAAHA pizza-style icon variations...")
    print("Colors: Lime green (#32CD32) on black background")
    print("Styles: Full circle, Half circle, Quarter circle, Eighth circle")
    
    create_all_pizza_icons()
    create_demo_sheets()
    
    print("\nPizza-style icon generation complete!")
    print("Directory structure:")
    print("- pizza_icons/full_circle/")
    print("- pizza_icons/half_circle/")
    print("- pizza_icons/quarter_circle/")
    print("- pizza_icons/eighth_circle/")