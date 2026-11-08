# ============================================================
# CINEMATIC PORTFOLIO — COMPLETE MEDIA SETUP SCRIPT (PowerShell)
# ============================================================

$portfolioPublic = "C:\Users\Ashuu\Documents\Sem 5\Projects\Portfolio\public"
$videoSrc        = "C:\Users\Ashuu\Downloads\Video edit-20261106T160901Z-1-001\Video edit"
$posterSrc       = "C:\Users\Ashuu\Downloads\Poster-20261106T160923Z-1-001\Poster"
$uploadedPhotos  = "C:\Users\Ashuu\.gemini\antigravity\brain\b045a315-bd50-426a-ac89-9484e3e19aac\.user_uploaded"

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  CINEMATIC PORTFOLIO — DEPLOYING MEDIA ASSETS" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Create Target Folders
Write-Host "[1/5] Ensuring directories exist..." -ForegroundColor Yellow
$dirs = @(
    "$portfolioPublic\videos",
    "$portfolioPublic\images\personal",
    "$portfolioPublic\images\projects",
    "$portfolioPublic\images\posters",
    "$portfolioPublic\images\before-after"
)
foreach ($d in $dirs) {
    if (-not (Test-Path $d)) {
        New-Item -ItemType Directory -Force -Path $d | Out-Null
    }
}
Write-Host "      Folders verified." -ForegroundColor Green

# 2. Copy Personal Photos
Write-Host "[2/5] Copying personal photos (Profile, Cover, Gallery)..." -ForegroundColor Yellow

$personalPhotos = @(
    # Primary Cover / Profile
    @{ Src = "$uploadedPhotos\media_1793982368696_aa88f318.jpg"; Dst = "$portfolioPublic\images\profile.jpg" },
    @{ Src = "$uploadedPhotos\media_1793982344566_24223006.jpg"; Dst = "$portfolioPublic\images\hero-poster.jpg" },
    
    # Personal Gallery Archive
    @{ Src = "$uploadedPhotos\media_1793982368696_aa88f318.jpg"; Dst = "$portfolioPublic\images\personal\photo-01-bollywood-retro.jpg" },
    @{ Src = "$uploadedPhotos\media_1793982344566_24223006.jpg"; Dst = "$portfolioPublic\images\personal\photo-02-cinematic-night-stairs.jpg" },
    @{ Src = "$uploadedPhotos\media_1793982368689_da23c03b.jpg"; Dst = "$portfolioPublic\images\personal\photo-03-sholay-poster.jpg" },
    @{ Src = "$uploadedPhotos\media_1793982344555_e24d42f5.jpg"; Dst = "$portfolioPublic\images\personal\photo-04-night-stadium-steps.jpg" },
    @{ Src = "$uploadedPhotos\media_1793982300510_125bf8a1.jpg"; Dst = "$portfolioPublic\images\personal\photo-05-gallery-looking-up.jpg" },
    @{ Src = "$uploadedPhotos\media_1793982306939_b35f5c3a.jpg"; Dst = "$portfolioPublic\images\personal\photo-06-gallery-chair-gaze.jpg" },
    @{ Src = "$uploadedPhotos\media_1793982313885_02cf4b94.jpg"; Dst = "$portfolioPublic\images\personal\photo-07-gallery-chair-heart.jpg" },
    @{ Src = "$uploadedPhotos\media_1793982344549_17ed233e.jpg"; Dst = "$portfolioPublic\images\personal\photo-08-gallery-wide-standing.jpg" },
    @{ Src = "$uploadedPhotos\media_1793982344578_8f8329f6.jpg"; Dst = "$portfolioPublic\images\personal\photo-09-night-cafe-lights.jpg" },
    @{ Src = "$uploadedPhotos\media_1793982344633_95341bc5.jpg"; Dst = "$portfolioPublic\images\personal\photo-10-casual-portrait.jpg" },

    # Fresh High-Res Posters & Direct Uploads
    @{ Src = "$uploadedPhotos\media_1794072412924_1ac5965c.jpg"; Dst = "$portfolioPublic\images\posters\poster-devi-democracy.jpg" },
    @{ Src = "$uploadedPhotos\media_1794072412924_1ac5965c.jpg"; Dst = "$portfolioPublic\images\projects\poster-devi-democracy.jpg" },
    @{ Src = "$uploadedPhotos\media_1794072411527_0be1611e.jpg"; Dst = "$portfolioPublic\images\posters\poster-udaan.jpg" },
    @{ Src = "$uploadedPhotos\media_1794072411527_0be1611e.jpg"; Dst = "$portfolioPublic\images\projects\poster-udaan.jpg" },
    @{ Src = "$uploadedPhotos\media_1794072419133_28de3ba9.mp4"; Dst = "$portfolioPublic\videos\reel-social-07.mp4" },
    @{ Src = "$uploadedPhotos\media_1794072419133_28de3ba9.mp4"; Dst = "$portfolioPublic\videos\reel-instagram-cut-10.mp4" },
    @{ Src = "$uploadedPhotos\media_1794072455610_804bcb78.mp4"; Dst = "$portfolioPublic\videos\reel-fastcut-08.mp4" },
    @{ Src = "$uploadedPhotos\media_1794072455610_804bcb78.mp4"; Dst = "$portfolioPublic\videos\reel-commercial-02.mp4" },
    @{ Src = "$uploadedPhotos\media_1794072455610_804bcb78.mp4"; Dst = "$portfolioPublic\videos\showreel.mp4" }
)

# Clean up legacy oversized files
$legacyFiles = @(
    "$portfolioPublic\images\posters\feature-poster.png",
    "$portfolioPublic\images\projects\feature-poster.png",
    "$portfolioPublic\images\posters\canva-design-work.jpg",
    "$portfolioPublic\images\projects\canva-design-work.jpg"
)
foreach ($f in $legacyFiles) {
    if (Test-Path $f) { Remove-Item -Force $f }
}

foreach ($item in $personalPhotos) {
    if (Test-Path $item.Src) {
        Copy-Item $item.Src $item.Dst -Force
        Write-Host "      ✓ $(Split-Path $item.Dst -Leaf)" -ForegroundColor Green
    } else {
        Write-Host "      ! Missing source: $(Split-Path $item.Src -Leaf)" -ForegroundColor DarkGray
    }
}

# 3. Copy Video Reels
Write-Host "[3/5] Copying video reels to public\videos (this may take 20-30s)..." -ForegroundColor Yellow

$videoMap = @(
    @{ Src = "video_20260423_212419_edit.mp4";        Dst = "showreel.mp4"          },
    @{ Src = "lv_0_20260514115448.mp4";               Dst = "reel-cinematic-01.mp4" },
    @{ Src = "lv_0_20260422145845.mp4";               Dst = "reel-commercial-02.mp4"},
    @{ Src = "New Project 2 -68B66D8-.mp4";           Dst = "project-narrative-03.mp4"},
    @{ Src = "VID_20260914_170736_048.mp4";           Dst = "reel-visuals-04.mp4"   },
    @{ Src = "New Project 10 -7827B03-.mp4";          Dst = "project-motion-05.mp4" },
    @{ Src = "lv_0_20260504111607.mp4";               Dst = "reel-grading-06.mp4"   },
    @{ Src = "VID_20261025_211936_055.mp4";           Dst = "reel-social-07.mp4"    },
    @{ Src = "video_20260423_212419_edit.mp4";        Dst = "reel-fastcut-08.mp4"   },
    @{ Src = "VID_20260904_165450_644.mp4";           Dst = "reel-teaser-09.mp4"    }
)

foreach ($v in $videoMap) {
    $src = Join-Path $videoSrc $v.Src
    $dst = Join-Path "$portfolioPublic\videos" $v.Dst
    if (Test-Path $src) {
        Copy-Item $src $dst -Force
        $sizeMB = [math]::Round((Get-Item $src).Length / 1MB, 1)
        Write-Host ("      ✓ {0,-28} ({1} MB)" -f $v.Dst, $sizeMB) -ForegroundColor Green
    } else {
        Write-Host "      ! Source not found: $($v.Src)" -ForegroundColor DarkGray
    }
}

# 4. Copy Posters and Project Stills
Write-Host "[4/5] Copying posters & key art to public\images\posters and projects..." -ForegroundColor Yellow

# Peaky Blinders Poster
$peakyFile = Get-ChildItem $posterSrc -Filter "Peaky*" | Select-Object -First 1
if ($peakyFile) {
    Copy-Item $peakyFile.FullName "$portfolioPublic\images\posters\peaky-blinders-poster.jpg" -Force
    Copy-Item $peakyFile.FullName "$portfolioPublic\images\projects\peaky-blinders-poster.jpg" -Force
    Write-Host "      ✓ peaky-blinders-poster.jpg" -ForegroundColor Green
}

# Other Posters & Stills
$posterMap = @(
    @{ Src = "IMG_20261031_153844_767.jpg";          Dst = "poster-art-01.jpg"       },
    @{ Src = "IMG_20261031_153859_012.jpg";          Dst = "poster-art-02.jpg"       },
    @{ Src = "IMG_20261031_153910_456.jpg";          Dst = "poster-art-03.jpg"       },
    @{ Src = "IMG_20260828_115241_575.jpg";          Dst = "creative-poster-04.jpg"  },
    @{ Src = "IMG_20260822_130513_174.jpg";          Dst = "film-still-05.jpg"       },
    @{ Src = "IMG_20260822_130516_419.jpg";          Dst = "film-still-06.jpg"       },
    @{ Src = "IMG_20260822_135529_076.jpg";          Dst = "film-still-07.jpg"       },
    @{ Src = "IMG-20260825-WA0060.jpg";              Dst = "design-poster-08.jpg"    }
)

foreach ($p in $posterMap) {
    $src = Join-Path $posterSrc $p.Src
    if (Test-Path $src) {
        Copy-Item $src "$portfolioPublic\images\posters\$($p.Dst)" -Force
        Copy-Item $src "$portfolioPublic\images\projects\$($p.Dst)" -Force
        Write-Host "      ✓ $($p.Dst)" -ForegroundColor Green
    } else {
        Write-Host "      ! Source not found: $($p.Src)" -ForegroundColor DarkGray
    }
}

# 5. Before / After Setup
Write-Host "[5/5] Setting up Before / After comparison frames..." -ForegroundColor Yellow
$still05 = Join-Path $posterSrc "IMG_20260822_130513_174.jpg"
$still06 = Join-Path $posterSrc "IMG_20260822_130516_419.jpg"
if (Test-Path $still05) {
    Copy-Item $still05 "$portfolioPublic\images\before-after\raw.jpg" -Force
    Write-Host "      ✓ raw.jpg (raw footage still)" -ForegroundColor Green
}
if (Test-Path $still06) {
    Copy-Item $still06 "$portfolioPublic\images\before-after\graded.jpg" -Force
    Write-Host "      ✓ graded.jpg (color-graded still)" -ForegroundColor Green
}

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  SUCCESS! ALL ASSETS READY IN public/ FOLDER" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Now you can start the website:" -ForegroundColor White
Write-Host "     pnpm dev" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
