#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw
import itertools

def create_quadrant_logo(quadrants, size=1024, bg_color=(255, 255, 255), fg_color=(0, 120, 255)):
    """
    Create a logo with specified quadrants filled
    quadrants: list of quadrant numbers (1,2,3,4) to fill
    1=top-right, 2=top-left, 3=bottom-left, 4=bottom-right
    """
    img = Image.new('RGBA', (size, size), bg_color + (0,))
    draw = ImageDraw.Draw(img)
    
    center = size // 2
    margin = max(10, size // 50)  # Proportional margin
    radius = center - margin
    
    # Ensure radius is positive
    if radius <= 0:
        radius = center - 1
    
    # Define quadrant angles (in degrees) - PIL uses 0° as 3 o'clock, going counter-clockwise
    quadrant_angles = {
        1: (0, 90),      # top-right (from 3 o'clock to 12 o'clock)  
        2: (90, 180),    # top-left (from 12 o'clock to 9 o'clock)
        3: (180, 270),   # bottom-left (from 9 o'clock to 6 o'clock)
        4: (270, 360)    # bottom-right (from 6 o'clock to 3 o'clock)
    }
    
    # Create bounding box for the circle - ensure x1 > x0 and y1 > y0
    x0 = center - radius
    y0 = center - radius  
    x1 = center + radius
    y1 = center + radius
    
    if x1 <= x0 or y1 <= y0:
        raise ValueError(f"Invalid bounding box: x0={x0}, y0={y0}, x1={x1}, y1={y1}")
    
    bbox = [x0, y0, x1, y1]
    
    # Draw filled quadrants
    for q in quadrants:
        if q in quadrant_angles:
            start_angle, end_angle = quadrant_angles[q]
            draw.pieslice(bbox, start_angle, end_angle, fill=fg_color)
    
    return img

def generate_all_combinations():
    """Generate all possible non-empty combinations of quadrants"""
    quadrants = [1, 2, 3, 4]
    combinations = []
    
    # Generate all possible combinations (1-4 quadrants)
    for r in range(1, 5):
        for combo in itertools.combinations(quadrants, r):
            combinations.append(list(combo))
    
    return combinations

def create_logo_variants():
    """Create all 15 possible quadrant combinations"""
    combinations = generate_all_combinations()
    
    # Create output directories
    os.makedirs('logos', exist_ok=True)
    os.makedirs('logos/variants', exist_ok=True)
    os.makedirs('logos/favicons', exist_ok=True)
    
    # Standard logo sizes
    logo_sizes = [1024, 512, 256, 128, 64, 32, 16]
    
    for i, combo in enumerate(combinations, 1):
        combo_str = ''.join(map(str, sorted(combo)))
        name = f"saaaaha_q{combo_str}"
        
        print(f"Generating variant {i}/15: {name} (quadrants: {combo})")
        
        # Generate different sizes
        for size in logo_sizes:
            logo = create_quadrant_logo(combo, size)
            
            # Save as PNG with transparency
            if size == 1024:
                logo.save(f'logos/variants/{name}.png')
            
            # Save favicon sizes
            if size <= 256:
                logo.save(f'logos/favicons/{name}_{size}x{size}.png')
                
                # Also save as ICO for favicon compatibility
                if size in [16, 32, 48]:
                    logo.save(f'logos/favicons/{name}_{size}x{size}.ico')

def create_demo_sheet():
    """Create a demo sheet showing all variants"""
    combinations = generate_all_combinations()
    
    # Create a large image to show all variants
    grid_size = 4  # 4x4 grid (15 variants + 1 empty)
    variant_size = 200
    margin = 20
    total_size = grid_size * (variant_size + margin) - margin
    
    demo = Image.new('RGB', (total_size, total_size), (240, 240, 240))
    
    for i, combo in enumerate(combinations):
        row = i // grid_size
        col = i % grid_size
        
        x = col * (variant_size + margin)
        y = row * (variant_size + margin)
        
        logo = create_quadrant_logo(combo, variant_size, (255, 255, 255), (0, 120, 255))
        
        # Convert to RGB for pasting
        if logo.mode == 'RGBA':
            background = Image.new('RGB', logo.size, (255, 255, 255))
            background.paste(logo, mask=logo.split()[-1])
            logo = background
        
        demo.paste(logo, (x, y))
    
    demo.save('logos/saaaaha_all_variants_demo.png')
    print("Demo sheet saved as logos/saaaaha_all_variants_demo.png")

if __name__ == "__main__":
    print("Creating SAAAAHA quadrant logo variants...")
    print("Total variants: 15 (excluding empty circle)")
    
    create_logo_variants()
    create_demo_sheet()
    
    print("\nLogo generation complete!")
    print("- Individual variants: logos/variants/")
    print("- Favicon sizes: logos/favicons/")
    print("- Demo sheet: logos/saaaaha_all_variants_demo.png")