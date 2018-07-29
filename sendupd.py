import socket
from time import sleep
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
nCnt = 0
while True:
    if nCnt >5 :
        sleep(2)
        nCnt = 0
    for data in [b'$123;CLEARHOLE;Product_id,Barcode_Cnt,0,NG,05&,\r',
            ]:
        # 发送数据:
        s.sendto(data, ('192.168.31.5', 8080))
        # 接收数据:CLEARHOLE
        #print(s.recv(1024).decode('utf-8'))
        sleep(2)
    nCnt += 1
s.close()
