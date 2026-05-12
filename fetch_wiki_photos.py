#!/usr/bin/env python3
"""
Wikipedia Photo Fetcher for Triplabo POIs
No API key needed — Wikipedia is completely free and open.

Run: python3 fetch_wiki_photos.py
Output: wiki_photo_results.json
"""

import urllib.request
import urllib.parse
import json
import time

# Wikipedia article titles for each POI (English & Japanese)
# format: (data_index, poi_name, wiki_titles_to_try)
POIS = [
    (0,  "増上寺",           ["Zōjō-ji", "Zojo-ji", "Zojoji"]),
    (1,  "炭火烧浓厚中华そば", None),  # no Wikipedia page
    (2,  "RED° TOKYO TOWER", ["Tokyo Tower"]),
    (3,  "Blue Bottle Coffee",["Blue Bottle Coffee"]),
    (4,  "芝公园",           ["Shiba Park, Tokyo", "Shiba Park"]),
    (5,  "森美术館",          ["Mori Art Museum"]),
    (6,  "鮨 田中",          None),
    (7,  "麻布台Hills",       ["Azabudai Hills"]),
    (8,  "六本木Hills",       ["Roppongi Hills"]),
    (9,  "神明神社",          ["Shiba Daijingū"]),
    (10, "东京塔展望台",      ["Tokyo Tower"]),
    (11, "茶之都 抹茶専門店", None),
    (12, "虎ノ門Hills",       ["Toranomon Hills"]),
    (13, "旧芝离宫恩赐庭园",  ["Kyu Shiba Rikyu Garden"]),
    (14, "和牛割烹 三田",     None),
    (15, "竹芝客运码头",      ["Takeshiba, Tokyo"]),
    (16, "大倉集古館",        ["Okura Museum of Art"]),
    (17, "銀座 久兵衛",       ["Kyubey"]),
    (18, "浜離宮恩賜庭園",    ["Hama-rikyū Gardens"]),
    (19, "国立新美术館",      ["The National Art Center, Tokyo"]),
    (20, "六本木夜生活",      ["Roppongi"]),
    (21, "港区立运动中心",    None),
    (22, "帝国酒店 SATSUKI",  ["Imperial Hotel, Tokyo"]),
    (23, "上野动物园",        ["Ueno Zoo"]),
    (24, "新宿御苑",          ["Shinjuku Gyoen National Garden"]),
    (25, "印度料理 马哈拉贾", None),
    (26, "东京中城",          ["Tokyo Midtown"]),
    (27, "台场海滨公园",      ["Odaiba", "Odaiba Seaside Park"]),
    (28, "BULGARI IL Bar",    ["Bvlgari Hotels and Resorts"]),
    (29, "国会议事堂",        ["National Diet Building"]),
]

# Fallback Unsplash photos for POIs without Wikipedia pages
# Chosen specifically to match each POI type
FALLBACKS = {
    1:  "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80&fit=crop",  # ramen
    6:  "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800&q=80&fit=crop",  # sushi counter
    11: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80&fit=crop",     # matcha
    14: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&fit=crop",  # wagyu
    20: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80&fit=crop",  # nightlife
    21: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&fit=crop",  # sports pool
    25: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80&fit=crop",  # indian food
    28: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80&fit=crop",     # luxury hotel bar
}


def fetch_wiki_image(titles):
    """Try each Wikipedia title until we find a thumbnail."""
    for title in titles:
        encoded = urllib.parse.quote(title.replace(" ", "_"))
        url = (
            f"https://en.wikipedia.org/api/rest_v1/page/summary/{encoded}"
        )
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "TriplaboDemo/1.0"})
            with urllib.request.urlopen(req, timeout=8) as resp:
                data = json.loads(resp.read())
                thumb = data.get("thumbnail", {}).get("source", "")
                if thumb:
                    # Upgrade to 800px width
                    img = thumb.replace("/320px-", "/800px-").replace("/220px-", "/800px-")
                    return img, title
        except Exception as e:
            pass
        time.sleep(0.2)
    return None, None


def main():
    results = {}
    print(f"Fetching Wikipedia images for {len(POIS)} POIs...\n")

    for idx, poi_name, wiki_titles in POIS:
        if wiki_titles:
            img_url, matched_title = fetch_wiki_image(wiki_titles)
            if img_url:
                results[idx] = {"n": poi_name, "img": img_url, "source": f"Wikipedia: {matched_title}"}
                print(f"✅ [{idx:2d}] {poi_name}")
                print(f"         {img_url}")
            else:
                fallback = FALLBACKS.get(idx, "")
                results[idx] = {"n": poi_name, "img": fallback, "source": "Unsplash fallback"}
                status = "⚠️ " if fallback else "❌"
                print(f"{status} [{idx:2d}] {poi_name} → Wikipedia not found, using fallback")
        else:
            fallback = FALLBACKS.get(idx, "")
            results[idx] = {"n": poi_name, "img": fallback, "source": "Unsplash (no Wikipedia page)"}
            status = "📷" if fallback else "❌"
            print(f"{status} [{idx:2d}] {poi_name} → Unsplash")

        time.sleep(0.3)

    # Summary
    wiki_count = sum(1 for v in results.values() if "Wikipedia" in v.get("source", ""))
    unsplash_count = sum(1 for v in results.values() if "Unsplash" in v.get("source", ""))
    missing = sum(1 for v in results.values() if not v.get("img"))

    print(f"\n{'='*60}")
    print(f"📚 Wikipedia images: {wiki_count}")
    print(f"📷 Unsplash images:  {unsplash_count}")
    print(f"❌ Missing:          {missing}")

    out_path = "wiki_photo_results.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"\nSaved to: {out_path}")
    print("→ Send this file back to Claude to update data.js")


if __name__ == "__main__":
    main()
