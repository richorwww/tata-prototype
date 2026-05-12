#!/usr/bin/env python3
"""
Foursquare Photo Fetcher for Triplabo POIs
Run once: python3 fetch_foursquare_photos.py
Output:   fsq_photo_results.json  (paste results back to Claude)
"""

import requests
import json
import time

API_KEY = "CUAPZVTZU2UYAIU0NOT0CHKEDO5ZPHATCUB0AFQSWYFLOM2I"
HEADERS = {"Authorization": API_KEY, "Accept": "application/json"}

POIS = [
    {"key": 0,  "n": "増上寺",              "ll": [139.7493, 35.6558], "en": "Zojoji Temple Tokyo"},
    {"key": 1,  "n": "炭火烧浓厚中华そば",  "ll": [139.7437, 35.6565], "en": "Sumibiyaki Noukou Chuka Soba ramen"},
    {"key": 2,  "n": "RED° TOKYO TOWER",    "ll": [139.7452, 35.6581], "en": "RED TOKYO TOWER"},
    {"key": 3,  "n": "Blue Bottle Coffee",  "ll": [139.7473, 35.6572], "en": "Blue Bottle Coffee Shiba Park"},
    {"key": 4,  "n": "芝公园",              "ll": [139.7479, 35.6574], "en": "Shiba Park"},
    {"key": 5,  "n": "森美术館",            "ll": [139.7292, 35.6604], "en": "Mori Art Museum Roppongi"},
    {"key": 6,  "n": "鮨 田中",             "ll": [139.7398, 35.6543], "en": "Sushi Tanaka Azabudai"},
    {"key": 7,  "n": "麻布台Hills",         "ll": [139.7425, 35.6597], "en": "Azabudai Hills"},
    {"key": 8,  "n": "六本木Hills",         "ll": [139.7310, 35.6603], "en": "Roppongi Hills"},
    {"key": 9,  "n": "神明神社",            "ll": [139.7453, 35.6560], "en": "Shinmei Shrine Shiba"},
    {"key": 10, "n": "东京塔展望台",        "ll": [139.7454, 35.6586], "en": "Tokyo Tower"},
    {"key": 11, "n": "茶之都 抹茶専門店",   "ll": [139.7498, 35.6671], "en": "Matcha cafe Toranomon Tokyo"},
    {"key": 12, "n": "虎ノ門Hills",         "ll": [139.7498, 35.6671], "en": "Toranomon Hills"},
    {"key": 13, "n": "旧芝离宫恩赐庭园",   "ll": [139.7583, 35.6538], "en": "Kyu Shiba Rikyu Garden"},
    {"key": 14, "n": "和牛割烹 三田",       "ll": [139.7391, 35.6465], "en": "Wagyu Kappo restaurant Mita"},
    {"key": 15, "n": "竹芝客运码头",        "ll": [139.7612, 35.6539], "en": "Takeshiba Pier Tokyo"},
    {"key": 16, "n": "大倉集古館",          "ll": [139.7453, 35.6713], "en": "Okura Museum of Art Tokyo"},
    {"key": 17, "n": "銀座 久兵衛",         "ll": [139.7648, 35.6715], "en": "Ginza Kyubey sushi"},
    {"key": 18, "n": "浜離宮恩賜庭園",      "ll": [139.7632, 35.6570], "en": "Hamarikyu Gardens Tokyo"},
    {"key": 19, "n": "国立新美术館",        "ll": [139.7272, 35.6645], "en": "National Art Center Tokyo"},
    {"key": 20, "n": "六本木夜生活",        "ll": [139.7310, 35.6626], "en": "Roppongi nightlife bar"},
    {"key": 21, "n": "港区立运动中心",      "ll": [139.7493, 35.6383], "en": "Minato Sports Center Tokyo"},
    {"key": 22, "n": "帝国酒店 SATSUKI",    "ll": [139.7590, 35.6731], "en": "Imperial Hotel Tokyo Satsuki pastry"},
    {"key": 23, "n": "上野动物园",          "ll": [139.7717, 35.7153], "en": "Ueno Zoo"},
    {"key": 24, "n": "新宿御苑",            "ll": [139.7100, 35.6851], "en": "Shinjuku Gyoen National Garden"},
    {"key": 25, "n": "印度料理 马哈拉贾",   "ll": [139.7310, 35.6626], "en": "Maharaja Indian Restaurant Roppongi"},
    {"key": 26, "n": "东京中城",            "ll": [139.7314, 35.6677], "en": "Tokyo Midtown Roppongi"},
    {"key": 27, "n": "台场海滨公园",        "ll": [139.7751, 35.6268], "en": "Odaiba Seaside Park"},
    {"key": 28, "n": "BULGARI IL Bar",      "ll": [139.7272, 35.6617], "en": "Bvlgari Hotel Tokyo Bar"},
    {"key": 29, "n": "国会议事堂",          "ll": [139.7451, 35.6760], "en": "National Diet Building Tokyo"},
]

FALLBACK_UNSPLASH = [
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1561059488-916d69792237?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&q=80&fit=crop",
]


def search_place(poi):
    lat, lng = poi["ll"]
    params = {
        "query": poi["en"],
        "ll": f"{lat},{lng}",
        "radius": 500,
        "limit": 3,
        "fields": "fsq_id,name,location"
    }
    r = requests.get(
        "https://api.foursquare.com/v3/places/search",
        headers=HEADERS, params=params, timeout=10
    )
    if r.status_code != 200:
        print(f"   ⚠️  HTTP {r.status_code}: {r.text[:200]}")
        return None, None
    data = r.json()
    if data.get("results"):
        return data["results"][0]["fsq_id"], data["results"][0]["name"]
    return None, None


def get_photo(fsq_id):
    r = requests.get(
        f"https://api.foursquare.com/v3/places/{fsq_id}/photos",
        headers=HEADERS,
        params={"limit": 5, "sort": "POPULAR"},
        timeout=10
    )
    if r.status_code != 200:
        print(f"   ⚠️  Photos HTTP {r.status_code}: {r.text[:200]}")
        return None
    photos = r.json()
    if photos and isinstance(photos, list) and len(photos) > 0:
        p = photos[0]
        return f"{p['prefix']}800x600{p['suffix']}"
    return None


def debug_single():
    """Test with one POI to diagnose the issue"""
    print("=== DEBUG: Testing API with Tokyo Tower ===")
    r = requests.get(
        "https://api.foursquare.com/v3/places/search",
        headers=HEADERS,
        params={"query": "Tokyo Tower", "ll": "35.6586,139.7454", "limit": 1},
        timeout=10
    )
    print(f"Status: {r.status_code}")
    print(f"Response: {r.text[:500]}")
    print("=" * 50)
    return r.status_code == 200


def main():
    # Debug check first
    if not debug_single():
        print("\n❌ API auth failed. Please check your API key.")
        return

    results = {}
    print(f"\nQuerying Foursquare for {len(POIS)} POIs...\n")

    for poi in POIS:
        try:
            fsq_id, place_name = search_place(poi)
            if not fsq_id:
                print(f"❌ [{poi['key']:2d}] {poi['n']} → not found")
                results[poi["key"]] = {"n": poi["n"], "fsq_id": None, "place": None, "img": None}
                time.sleep(0.3)
                continue

            photo_url = get_photo(fsq_id)
            results[poi["key"]] = {
                "n": poi["n"],
                "fsq_id": fsq_id,
                "place": place_name,
                "img": photo_url
            }
            status = "✅" if photo_url else "⚠️  (no photo)"
            print(f"{status} [{poi['key']:2d}] {poi['n']} → {place_name}")
            if photo_url:
                print(f"         {photo_url}")

        except Exception as e:
            print(f"💥 [{poi['key']:2d}] {poi['n']} → ERROR: {e}")
            results[poi["key"]] = {"n": poi["n"], "fsq_id": None, "place": None, "img": None}

        time.sleep(0.35)  # rate limiting

    # Summary
    found = sum(1 for v in results.values() if v["img"])
    print(f"\n{'='*60}")
    print(f"✅ Photos found: {found}/{len(POIS)}")
    print(f"❌ Missing:      {len(POIS) - found}/{len(POIS)}")

    # Save JSON
    out_path = "fsq_photo_results.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"\nResults saved to: {out_path}")
    print("→ Send this file (or its contents) back to Claude to update data.js")


if __name__ == "__main__":
    main()
