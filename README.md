# xcode-build-number-auto-update

Update the Bundle Number (build number) auto update action.

## Useage

### Set the run number of GitHub Action 
```
- name: Xcode build number auto update
  uses: poad/xcode-build-number-auto-update@v1
  with:
      path: ./your_project/Info.plist
      new-number: ${{ github.run_number }}
```

### Set the Timestamp of GitHub Action 
```
- name: Xcode build number auto update
  uses: poad/xcode-build-number-auto-update@v1
  with:
      path: ./your_project/Info.plist
      new-number: $(date +%Y%m%d%H%M%S)
```

### Auto Increment by GitHub Action 
```
- name: Xcode build number auto update
  uses: poad/xcode-build-number-auto-update@v1
  with:
      path: ./your_project/Info.plist
      auto-increment: true
```
