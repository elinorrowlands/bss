```javascript
document.querySelectorAll('image').forEach(x=>x.style.filter='invert(15%) sepia(84%) saturate(4212%) hue-rotate(164deg) brightness(98%) contrast(103%)')
```

```javascript
document.querySelectorAll('image').forEach((x,i)=>x.style.filter=`invert(${i*2}%) sepia(${i*2%100}%) saturate(4212%) hue-rotate(164deg) brightness(98%) contrast(103%)`)
```