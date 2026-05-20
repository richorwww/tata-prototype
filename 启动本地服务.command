#!/bin/bash
# 双击运行，在 http://localhost:8888 启动本地服务
cd "/Users/wang/Desktop/Triplabo AI"
echo "=================================="
echo "  Triplabo Demo 本地服务已启动"
echo "  东京塔: http://localhost:8888/"
echo "  晴空塔: http://localhost:8888/skytree/"
echo "  按 Ctrl+C 停止"
echo "=================================="
python3 -m http.server 8888
